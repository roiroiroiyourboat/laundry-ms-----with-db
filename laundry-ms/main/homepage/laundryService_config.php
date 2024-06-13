<?php
header('Content-Type: application/json');  //check if the response is in JSON format

try {
    //Get form data
    $customer_name = $_POST['customer_name'];
    $contact_number = $_POST['contact_number'];
    $quantity = $_POST['quantity'];
    $service = $_POST['service'];
    $category = $_POST['category'];
    $weight = $_POST['weight'];
    $category_rate = $_POST['category_rate'];
    $price = $_POST['price'];

    //database connection
    $conn = new mysqli('localhost', 'root', '', 'db_laundry');

    //Check connection
    if ($conn->connect_error) {
        throw new Exception('Connection Failed: ' . $conn->connect_error);
    } else {
        //Prepare and bind
        /*siissidd
        s - string
        i - integer
        d - double
        */
        $stmt = $conn->prepare("INSERT INTO tbl_transaction (name, contact_number, quantity, laundry_service, laundry_category, weight, rate, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("siissidd", $customer_name, $contact_number, $quantity, $service, $category, $weight, $category_rate, $price);
        $stmt->execute();
        $stmt->close();
        $conn->close();

        //rerurn a JSON response
        echo json_encode([
            'status' => 'success',
            'message' => 'Order added successfully!',
            'customer_name' => $customer_name,
            'contact_number' => $contact_number
        ]);
    }
} catch (Exception $e) {
    //return a JSON response with the error
    http_response_code(500); //internal Server Error
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

?>
