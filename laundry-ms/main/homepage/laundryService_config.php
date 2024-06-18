<?php
session_start();
header('Content-Type: application/json');

try {
    $customer_name = $_POST['customer_name'];
    $contact_number = $_POST['contact_number'];
    $quantity = $_POST['quantity'];
    $service = $_POST['service'];
    $category = $_POST['category'];
    $weight = $_POST['weight'];
    $price = $_POST['price'];

    $conn = new mysqli('localhost', 'root', '', 'db_laundry');

    if ($conn->connect_error) {
        throw new Exception('Connection Failed: ' . $conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT customer_id FROM tbl_customer WHERE customer_name = ?");
        $stmt->bind_param("s", $customer_name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $customer_id = $row['customer_id'];
        } else {
            $stmt = $conn->prepare("INSERT INTO tbl_customer (customer_name, contact_number) VALUES (?, ?)");
            $stmt->bind_param("si", $customer_name, $contact_number);
            $stmt->execute();
            $customer_id = $stmt->insert_id;
        }
        $stmt->close();

        $stmt = $conn->prepare("INSERT INTO tbl_service_request (customer_id, customer_name, contact_number, laundry_service_option, laundry_category_option, quantity, weight, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issssidd", $customer_id, $customer_name, $contact_number, $service, $category, $quantity, $weight, $price);
        $stmt->execute();
        $stmt->close();
        $conn->close();

        echo json_encode(['status' => 'success', 'message' => 'Order added successfully!', 'customer_id' => $customer_id]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
