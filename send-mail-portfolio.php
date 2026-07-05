<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

/**
 * Loads SMTP settings from the private config file.
 *
 * @return array<string, mixed>|null
 */
function loadMailConfig(): ?array
{
    $configPath = __DIR__ . '/private/mail-config.php';
    if (!file_exists($configPath)) {
        return null;
    }

    $config = require $configPath;
    return is_array($config) ? $config : null;
}


/**
 * Sends one SMTP command and validates the response code.
 *
 * @param resource $socket
 */
function smtpCommand($socket, string $command, array $expectedCodes): bool
{
    fwrite($socket, $command . "\r\n");
    return smtpExpect($socket, $expectedCodes);
}


/**
 * Reads an SMTP response and checks the expected status code.
 *
 * @param resource $socket
 */
function smtpExpect($socket, array $expectedCodes): bool
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);
    if (in_array($code, $expectedCodes, true)) {
        return true;
    }

    error_log('SMTP error: ' . trim($response));
    return false;
}


/**
 * Escapes lines beginning with a dot according to SMTP DATA rules.
 */
function smtpEscapeMessage(string $message): string
{
    return preg_replace('/^\./m', '..', $message);
}


/**
 * Sends a contact message through authenticated SMTPS.
 *
 * @param array<string, mixed> $config
 */
function sendSmtpMail(array $config, string $replyTo, string $subject, string $htmlBody): bool
{
    $host = (string) ($config['host'] ?? '');
    $port = (int) ($config['port'] ?? 465);
    $username = (string) ($config['username'] ?? '');
    $password = (string) ($config['password'] ?? '');
    $fromEmail = (string) ($config['from_email'] ?? $username);
    $fromName = (string) ($config['from_name'] ?? 'Website Kontakt');
    $recipientEmail = (string) ($config['recipient_email'] ?? $fromEmail);
    $heloDomain = (string) ($config['helo_domain'] ?? 'igor-boger.de');

    if ($host === '' || $username === '' || $password === '' || $fromEmail === '' || $recipientEmail === '') {
        error_log('SMTP config is incomplete.');
        return false;
    }

    $errno = 0;
    $errstr = '';
    $socket = fsockopen('ssl://' . $host, $port, $errno, $errstr, 20);

    if (!$socket) {
        error_log("SMTP connection failed: {$errno} {$errstr}");
        return false;
    }

    stream_set_timeout($socket, 20);

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=utf-8',
        'From: ' . $fromName . ' <' . $fromEmail . '>',
        'Reply-To: ' . $replyTo,
        'Subject: ' . $subject,
        'To: ' . $recipientEmail,
    ];

    $message = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody;
    $message = smtpEscapeMessage($message);

    $success =
        smtpExpect($socket, [220]) &&
        smtpCommand($socket, 'EHLO ' . $heloDomain, [250]) &&
        smtpCommand($socket, 'AUTH LOGIN', [334]) &&
        smtpCommand($socket, base64_encode($username), [334]) &&
        smtpCommand($socket, base64_encode($password), [235]) &&
        smtpCommand($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]) &&
        smtpCommand($socket, 'RCPT TO:<' . $recipientEmail . '>', [250, 251]) &&
        smtpCommand($socket, 'DATA', [354]) &&
        smtpCommand($socket, $message . "\r\n.", [250]);

    fwrite($socket, "QUIT\r\n");
    fclose($socket);

    return $success;
}


switch ($_SERVER['REQUEST_METHOD']) {

    case 'OPTIONS':
        http_response_code(200);
        exit;

    case 'POST':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
            exit;
        }

        $email = trim($params->email ?? '');
        $name = trim($params->name ?? '');
        $userMessage = trim($params->message ?? '');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $name === '' || $userMessage === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid input data']);
            exit;
        }

        $config = loadMailConfig();
        if ($config === null) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Mail config missing']);
            exit;
        }

        $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
        $safeMessage = nl2br(htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8'));

        $subject = 'Neue Nachricht vom Kontaktformular';

        $mailBody = "
            <strong>Name:</strong> {$safeName}<br>
            <strong>Email:</strong> {$safeEmail}<br><br>
            <strong>Message:</strong><br>
            {$safeMessage}
        ";

        $success = sendSmtpMail($config, $safeEmail, $subject, $mailBody);

        if ($success) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Mail delivery failed']);
        }

        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
}