<?php

declare(strict_types=1);

define('INSTA_DATA_DIR', __DIR__ . '/data');

header('Content-Type: application/json');

$username = @$_GET['username'];
if (!isset($username)) {
    $json = ['users' => getUsernames()];
    echo json_encode($json);
    exit(0);
}
echo json_encode(getInstaData($username, @$_GET['c'], @$_GET['p']));


function getUsernames(): array
{
    $dbFiles = array_filter(glob(INSTA_DATA_DIR . '/*.db'), 'is_file');
    $dbNames = array_map('basename', $dbFiles);
    $usernames = array_map(function (string $dbName) {
        return preg_replace('/\.db$/', '', $dbName);
    }, $dbNames);
    return $usernames;
}

function getInstaData(string $username, $count, $page): array
{
    $dbPath = INSTA_DATA_DIR . "/${username}.db";
    if (!file_exists($dbPath)) {
        echo '[]';
        exit(1);
    }

    $db = new SQLite3($dbPath);

    $count = $count ?? 50;
    $page = $page ?? 1;
    $offset = intval($count) * (intval($page) - 1);

    $stmt = $db->prepare("SELECT * FROM '${username}' ORDER BY timestamp DESC LIMIT :offset, :count");
    $stmt->bindValue(':offset', $offset);
    $stmt->bindValue(':count', $count);
    $exec = $stmt->execute();

    $result = [];
    while ($row = $exec->fetchArray(SQLITE3_ASSOC)) {
        $result[] = $row;
    }
    return $result;
}
