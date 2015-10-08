<?php
/**
 * @param $dir
 * @return array
 */
function getFilesFromFolder($dir)
{
    $files = [];

    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if ($file != "." && $file != "..") {
                $files[] = [
                    'file' => ($dir . '/' . $file),
                    'name' => str_replace(['.ogg', '_'], ['', ' '], ucfirst($file))
                ];
            }
        }
        closedir($dh);
    }

    return $files;
}

$audioSources = array_merge(getFilesFromFolder('sounds/male'));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Audio Madness</title>
    <link type="text/css" rel="stylesheet" href="css/style.css"/>
</head>
<body>
<div id="preloader"></div>
<button id="play-all">Play All</button>
<div id="controls">
    <input type="number" value="2500" id="frequency"/>
    <select id="filter">
        <option value="lowpass" selected>lowpass</option>
        <option value="highpass">highpass</option>
    </select>
</div>
<div id="sounds">
    <?php foreach ($audioSources as $index => $source): ?>
        <div class="sound">
            <a href="#" data-index="<?= $index; ?>"><?= $source['name']; ?></a>
        </div>
    <?php endforeach; ?>
</div>
<script type="text/javascript">var audioSources = <?= json_encode($audioSources); ?>;</script>
<script type="text/javascript" src="js/libraries/buffer-loader.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>
