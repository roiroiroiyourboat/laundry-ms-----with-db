<?php
header('Content-Type: application/json');

try {
    $customer_name = $_POST['customer_name'];
    $contact_number = $_POST['contact_number'];
    $conn = new mysqli('localhost', 'root', '', 'db_laundry');

    if ($conn->connect_error) {
        throw new Exception('Connection Failed: ' . $conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT * FROM tbl_customer WHERE customer_name = ? OR contact_number = ?");
        
        if ($stmt === false) {
            throw new Exception('Prepare Failed: ' . $conn->error);
        }

        $stmt->bind_param("ss", $customer_name, $contact_number);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['status' => 'error', 'message' => 'Customer name or contact number already exist']);
        } else {
            echo json_encode(['status' => 'success', 'message' => 'Customer name or contact number are available']);
        }

        $stmt->close();
        $conn->close();
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
