# Instagram2SQLite3-FRONT

[Instagram2SQLite3](https://github.com/sugtao4423/Instagram2SQLite3)のフロント側

apiとして使うphpはこんな感じでいいんじゃね（適当

## getjson.php
```
<?php
$db = new SQLite3('./data/USERNAME.db');

$count = $_GET['c'] ?? 50;
$page = $_GET['p'] ?? 1;

$query = $db->query('SELECT * FROM USERNAME ORDER BY timestamp DESC LIMIT ' . $count*($page-1) . ", ${count}");

$result = [];
while($row = $query->fetchArray(SQLITE3_ASSOC)){
    $result[] = $row;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);
```

## 使うときに書き換えるもの
* `getjson.php`:
    - `USERNAME.db`
    - `USERNAME`
* `App.vue`:
    - `apiUrl: './getjson.php'`
    - `mediaDir: './data/USERNAME'`
