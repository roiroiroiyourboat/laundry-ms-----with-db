<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root','','db_laundry');
if($conn->connect_error){
    die('Failed to connect : '.$conn->connect_error);
} else {
    $sql = "SELECT laundry_service_option FROM tbl_service";
    $result = $conn->query($sql);

    $services = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $services[] = $row['laundry_service_option'];
        }
    }
    echo json_encode($services);
}

$conn->close();
?>
