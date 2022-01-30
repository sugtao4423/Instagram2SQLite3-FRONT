# Instagram2SQLite3-FRONT

[Instagram2SQLite3](https://github.com/sugtao4423/Instagram2SQLite3)のフロント側

## tree
```
.
├── data
│   ├── Instagram2SQLite3.php
│   ├── sugtao4423/
│   └── sugtao4423.db
└── getjson.php
```

## getjson.php
apiとして使うphpはこんな感じでいいんじゃね（適当

```php
<?php
$username = $_GET['username'];
$dbPath = "./data/${username}.db";
if (!isset($username) || !file_exists($dbPath)) {
    echo '[]';
    exit(1);
}

$db = new SQLite3($dbPath);

$count = $_GET['c'] ?? 50;
$page = $_GET['p'] ?? 1;
$offset = $count * ($page - 1);

$stmt = $db->prepare("SELECT * FROM '${username}' ORDER BY timestamp DESC LIMIT :offset, :count");
$stmt->bindValue(':offset', $offset);
$stmt->bindValue(':count', $count);
$exec = $stmt->execute();

$result = [];
while ($row = $exec->fetchArray(SQLITE3_ASSOC)) {
    $result[] = $row;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);
```
