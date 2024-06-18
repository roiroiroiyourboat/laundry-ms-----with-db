<?php
header('Content-Type: application/json');

try {
    //get the customer name and contact number from the request
    $customer_name = $_POST['customer_name'];
    $contact_number = $_POST['contact_number'];

    //db connection
    $conn = new mysqli('localhost', 'root', '', 'db_laundry');

    //check connection
    if ($conn->connect_error) {
        throw new Exception('Connection Failed: ' . $conn->connect_error);
    } else {
        //prepare and bind statement to delete service request
        $stmt = $conn->prepare("DELETE FROM tbl_service_request WHERE customer_name = ? AND contact_number = ?");
        $stmt->bind_param("ss", $customer_name, $contact_number);
        $stmt->execute();

        //Check if the delete was successful
        if ($stmt->affected_rows > 0) {
            //Check if the customer has any remaining service requests
            $stmt = $conn->prepare("SELECT COUNT(*) as count FROM tbl_service_request WHERE customer_name = ? AND contact_number = ?");
            $stmt->bind_param("ss", $customer_name, $contact_number);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

            //If no remaining service requests, delete the customer record
            if ($row['count'] == 0) {
                $stmt = $conn->prepare("DELETE FROM tbl_customer WHERE customer_name = ? AND contact_number = ?");
                $stmt->bind_param("ss", $customer_name, $contact_number);
                $stmt->execute();
            }

            //Return a JSON response
            echo json_encode([
                'status' => 'success',
                'message' => 'Your service request has been canceled successfully.'
            ]);
        } else {
            throw new Exception('Failed to cancel the order.');
        }

        $stmt->close();
        $conn->close();
    }
} catch (Exception $e) {
    //Return a JSON response with the error
    http_response_code(500); //Internal Server Error
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
