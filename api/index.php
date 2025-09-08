<?php
declare(strict_types=1);

// Simple PHP REST API with MySQL (PDO)
// Endpoints:
//  - GET    /hero
//  - POST   /hero        { main_title: string, tiles: [{ icon, title, content, sort_order? }] }
//  - DELETE /hero
//  - GET    /offer            |  POST /offer           |  PUT /offer/{id}           |  DELETE /offer/{id}
//  - GET    /projects         |  POST /projects        |  PUT /projects/{id}        |  DELETE /projects/{id}
//  - GET    /blog             |  POST /blog            |  PUT /blog/{id}            |  DELETE /blog/{id}
//  - GET    /team             |  POST /team            |  PUT /team/{id}            |  DELETE /team/{id}
//
// Run locally:
//    php -S 127.0.0.1:8000 -t api
// Then call: http://127.0.0.1:8000/hero etc.
//
// Configure DB via environment variables (or defaults):
//    DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT (optional), DB_CHARSET (optional)

// CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
header('Content-Type: application/json; charset=utf-8');

// Helpers
function env_val(string $key, ?string $default = null): string
{
    $val = getenv($key);
    return ($val === false || $val === '') ? ($default ?? '') : $val;
}

function send_json($data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function error_json(string $message, int $status = 400, array $extra = []): void
{
    $payload = array_merge(['error' => $message], $extra);
    send_json($payload, $status);
}

function read_json(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false) {
        return [];
    }
    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_json('Invalid JSON payload: ' . json_last_error_msg(), 400);
        exit;
    }
    return is_array($data) ? $data : [];
}

function get_pdo(): PDO
{
    $host = env_val('DB_HOST', 'mysql1.small.pl');
    $db   = env_val('DB_NAME', 'm2985_coolweb');
    $user = env_val('DB_USER', 'm2985_bpieczka');
    $pass = env_val('DB_PASS', 'r35toApp2025!!');
    $port = env_val('DB_PORT', '3306');
    $charset = env_val('DB_CHARSET', 'utf8mb4');

    $dsn = "mysql:host={$host};port={$port};dbname={$db};charset={$charset}";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    return new PDO($dsn, $user, $pass, $options);
}

function ensure_tables(PDO $pdo): void
{
    // HERO: stores main_title on each row (for tiles), enabling a simple single-table approach
    $pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS hero (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      main_title VARCHAR(255) NOT NULL,
      icon VARCHAR(255) NOT NULL,
      tile_title VARCHAR(255) NOT NULL,
      tile_content TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    SQL);

    // OFERTA (offer)
    $pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS oferta (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      icon VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    SQL);

    // PROJEKTY (projects)
    $pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS projekty (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      link VARCHAR(512) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    SQL);

    // BLOG
    $pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS blog (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      short_description VARCHAR(512) NOT NULL,
      long_description MEDIUMTEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    SQL);

    // TEAM
    $pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS team (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      fb_url VARCHAR(512) DEFAULT NULL,
      linkedin_url VARCHAR(512) DEFAULT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    SQL);

    // NEWSLETTER
    $pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS newsletter (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    SQL);
}

function find_resource_and_id(string $path): array
{
    $segments = array_values(array_filter(explode('/', $path)));
    $resources = ['hero', 'offer', 'projects', 'blog', 'team', 'contact', 'newsletter'];

    $resource = null;
    $id = null;

    foreach ($segments as $i => $seg) {
        if (in_array($seg, $resources, true)) {
            $resource = $seg;
            if (isset($segments[$i + 1]) && ctype_digit($segments[$i + 1])) {
                $id = (int) $segments[$i + 1];
            }
            break;
        }
    }

    return [$resource, $id];
}

function handle_hero(PDO $pdo, string $method): void
{
    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT id, main_title, icon, tile_title, tile_content, sort_order FROM hero ORDER BY sort_order ASC, id ASC');
        $rows = $stmt->fetchAll();
        $mainTitle = $rows[0]['main_title'] ?? '';
        $tiles = [];
        foreach ($rows as $r) {
            $tiles[] = [
                'id' => (int)$r['id'],
                'icon' => $r['icon'],
                'title' => $r['tile_title'],
                'content' => $r['tile_content'],
                'sort_order' => (int)$r['sort_order'],
            ];
        }
        send_json(['main_title' => $mainTitle, 'tiles' => $tiles]);
        return;
    }

    if ($method === 'POST') {
        $body = read_json();
        $main = trim((string)($body['main_title'] ?? ''));
        $tiles = $body['tiles'] ?? [];
        if ($main === '' || !is_array($tiles)) {
            error_json('Expected payload: { main_title: string, tiles: array }', 422);
            return;
        }

        $pdo->beginTransaction();
        try {
            $pdo->exec('DELETE FROM hero');
            $ins = $pdo->prepare('INSERT INTO hero (main_title, icon, tile_title, tile_content, sort_order) VALUES (:main_title, :icon, :tile_title, :tile_content, :sort_order)');
            $i = 0;
            foreach ($tiles as $tile) {
                $icon = trim((string)($tile['icon'] ?? ''));
                $title = trim((string)($tile['title'] ?? ''));
                $content = trim((string)($tile['content'] ?? ''));
                $order = isset($tile['sort_order']) && is_numeric($tile['sort_order']) ? (int)$tile['sort_order'] : $i;
                if ($icon === '' || $title === '' || $content === '') {
                    throw new RuntimeException('Each tile must have icon, title and content');
                }
                $ins->execute([
                    ':main_title' => $main,
                    ':icon' => $icon,
                    ':tile_title' => $title,
                    ':tile_content' => $content,
                    ':sort_order' => $order,
                ]);
                $i++;
            }
            $pdo->commit();
            send_json(['status' => 'ok'], 201);
        } catch (Throwable $e) {
            $pdo->rollBack();
            error_json('Failed to save hero: ' . $e->getMessage(), 500);
        }
        return;
    }

    if ($method === 'DELETE') {
        $pdo->exec('DELETE FROM hero');
        http_response_code(204);
        return;
    }

    error_json('Method not allowed', 405);
}

function handle_crud(PDO $pdo, string $method, string $table, array $fields, ?int $id): void
{
    if ($method === 'GET') {
        if ($id !== null) {
            $stmt = $pdo->prepare("SELECT * FROM {$table} WHERE id = :id");
            $stmt->execute([':id' => $id]);
            $row = $stmt->fetch();
            if (!$row) {
                error_json('Not found', 404);
                return;
            }
            send_json($row);
        } else {
            $orderCol = in_array('sort_order', $fields, true) ? 'sort_order, id' : 'id';
            $stmt = $pdo->query("SELECT * FROM {$table} ORDER BY {$orderCol}");
            $rows = $stmt->fetchAll();
            send_json($rows);
        }
        return;
    }

    if ($method === 'POST') {
        $data = read_json();
        // Build insert with allowed fields only
        $cols = [];
        $params = [];
        $placeholders = [];
        foreach ($fields as $f) {
            if (array_key_exists($f, $data)) {
                $cols[] = $f;
                $params[":{$f}"] = $data[$f];
                $placeholders[] = ":{$f}";
            }
        }
        if (empty($cols)) {
            error_json('No valid fields provided for insert', 422);
            return;
        }
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $table,
            implode(', ', $cols),
            implode(', ', $placeholders)
        );
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        send_json(['id' => (int)$pdo->lastInsertId()], 201);
        return;
    }

    if ($method === 'PUT') {
        if ($id === null) {
            error_json('Missing resource id', 400);
            return;
        }
        $data = read_json();
        $sets = [];
        $params = [':id' => $id];
        foreach ($fields as $f) {
            if (array_key_exists($f, $data)) {
                $sets[] = "$f = :$f";
                $params[":{$f}"] = $data[$f];
            }
        }
        if (empty($sets)) {
            error_json('No valid fields provided for update', 422);
            return;
        }
        $sql = sprintf('UPDATE %s SET %s WHERE id = :id', $table, implode(', ', $sets));
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        http_response_code(204);
        return;
    }

    if ($method === 'DELETE') {
        if ($id === null) {
            error_json('Missing resource id', 400);
            return;
        }
        $stmt = $pdo->prepare("DELETE FROM {$table} WHERE id = :id");
        $stmt->execute([':id' => $id]);
        http_response_code(204);
        return;
    }

    error_json('Method not allowed', 405);
}

function handle_contact(string $method): void
{
    if ($method !== 'POST') {
        error_json('Method not allowed', 405);
        return;
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    $name = '';
    $email = '';
    $subject = '';
    $message = '';

    if (stripos($contentType, 'application/json') !== false) {
        $data = read_json();
        $name = trim((string)($data['name'] ?? ''));
        $email = trim((string)($data['email'] ?? ''));
        $subject = trim((string)($data['subject'] ?? ''));
        $message = trim((string)($data['message'] ?? ''));
    } else {
        $name = trim((string)($_POST['name'] ?? ''));
        $email = trim((string)($_POST['email'] ?? ''));
        $subject = trim((string)($_POST['subject'] ?? ''));
        $message = trim((string)($_POST['message'] ?? ''));
    }

    if ($name === '' || $email === '' || $subject === '' || $message === '') {
        error_json('Missing fields: name, email, subject, message are required', 422);
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_json('Invalid email address', 422);
        return;
    }

    require_once __DIR__ . '/../PHPMailer/PHPMailer/Exception.php';
    require_once __DIR__ . '/../PHPMailer/PHPMailer/PHPMailer.php';
    require_once __DIR__ . '/../PHPMailer/PHPMailer/SMTP.php';

    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

    try {
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->Host = 'mail1.small.pl';
        $mail->SMTPAuth = true;
        $mail->Username = 'biuro@coolweb.com.pl';
        $mail->Password = 'Jqmn7pccts2025!!';
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->addAddress('biuro@coolweb.com.pl');
        $mail->setFrom('mailer@coolweb.com.pl', 'Mailer');

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $safeMsg = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
        $mail->Body = $safeName . '<br>' . $safeEmail . '<br><br>' . $safeMsg;
        $mail->AltBody = "Name: {$name}\nEmail: {$email}\n\n{$message}";

        $mail->send();
        send_json(['status' => 'ok', 'message' => 'Thank You! Your message was sent :)']);
    } catch (\Throwable $e) {
        // Prefer PHPMailer error info if available
        $err = method_exists($mail, 'ErrorInfo') && !empty($mail->ErrorInfo) ? $mail->ErrorInfo : $e->getMessage();
        error_json('Ooopssss... we have some problems with sending message: ' . $err, 500);
    }
}

function handle_newsletter(PDO $pdo, string $method): void
{
    if ($method !== 'POST') {
        error_json('Method not allowed', 405);
        return;
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    $email = '';

    if (stripos($contentType, 'application/json') !== false) {
        $data = read_json();
        $email = trim((string)($data['email'] ?? ''));
    } else {
        $email = trim((string)($_POST['email'] ?? ''));
    }

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_json('Invalid email address', 422);
        return;
    }

    try {
        $stmt = $pdo->prepare('INSERT INTO newsletter (email) VALUES (:email)');
        $stmt->execute([':email' => $email]);
        send_json(['status' => 'ok', 'message' => 'Thank you for subscribe to our newsletter!'], 201);
    } catch (Throwable $e) {
        // Duplicate email (unique constraint) -> treat as idempotent success
        if (preg_match('/duplicate|unique/i', $e->getMessage())) {
            send_json(['status' => 'ok', 'message' => 'You are subscribed with these email address!'], 200);
            return;
        }
        error_json('Failed to save email: ' . $e->getMessage(), 500);
    }
}

try {
    $pdo = get_pdo();
    ensure_tables($pdo);
} catch (Throwable $e) {
    error_json('Database connection error: ' . $e->getMessage(), 500);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
[$resource, $id] = find_resource_and_id($path);

if ($resource === null) {
    send_json(['status' => 'ok', 'message' => 'API ready', 'resources' => ['hero', 'offer', 'projects', 'blog', 'team', 'contact', 'newsletter']]);
    exit;
}

switch ($resource) {
    case 'hero':
        handle_hero($pdo, $method);
        break;

    case 'offer':
        handle_crud($pdo, $method, 'oferta', ['icon', 'title', 'content', 'sort_order'], $id);
        break;

    case 'projects':
        handle_crud($pdo, $method, 'projekty', ['image', 'title', 'description', 'link', 'sort_order'], $id);
        break;

    case 'blog':
        handle_crud($pdo, $method, 'blog', ['image', 'title', 'short_description', 'long_description'], $id);
        break;

    case 'team':
        handle_crud($pdo, $method, 'team', ['image', 'full_name', 'role', 'fb_url', 'linkedin_url', 'sort_order'], $id);
        break;

    case 'contact':
        handle_contact($method);
        break;

    case 'newsletter':
        handle_newsletter($pdo, $method);
        break;

    default:
        error_json('Not found', 404);
}
