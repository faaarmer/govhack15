<?php

require('../../vendor/autoload.php');

$pusher = new Pusher('9b198123b867650ff8cb', 'cc8bbf10251c6efbd0d2', '128293');

// trigger on my_channel' an event called 'my_event' with this payload:

$data['message'] = 'hello world';
$pusher->trigger('my_channel', 'my_event', $data);

?>