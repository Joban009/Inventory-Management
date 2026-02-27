<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


require_once 'config.php';


 $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data['userName']) || !isset($data['userEmail'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }





    $userName = $data['userName'];
    $userEmail = $data['userEmail'];


    $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES(?,?)");
    $stmt->bind_param("ss", $userName, $userEmail );
    if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "ID created"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}




// if (isset($_POST[''])) {

//     $name = $_POST[''];
//     $orgName = $_POST[''];
//     $email = $_POST[''];
//     $password = password_hash($_PSOT[''], PASSWORD_DEFAULT);

//     $checkEmail = $conn->query("SELECT email FROM user WHERE email='$email'");
//     if($checkEmail->num_rows >0) {
//         $_SESSION['register_error'] = "Email is already registered!";
//     }
//     else {
//         $conn->query("INSERT INTO user (name, email, password, role) VALUES ('$name','$orgName','$email','$password') ")
//     }


//     header("Location: login.jsx");
//     exit();
// }
// if (isset($_PSOT[''])) {
//     $email=$_POST[''];
//     $password =$_POST[''];

//     $result = $conn->query("SELECT *FORM usere WHERE email='$email'");
//     if($result->num_rows >0) {
//         $user = $result-> fetch_assoc();
//         if(password_verify($password,$user['password'])) {
//             $_SESSION['name']=$user['name'];
//             $_SESSION['email']=$user['email'];
//             header("Location: dashboard.jsx");
//             exit();
//         }
//     }
// $_SESSION['login_error']= 'Incorrect email or password';
// header("Location: login.jsx")
// exit();

//     }

?>