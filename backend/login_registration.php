<?php
// ✅ CORS and session cookies MUST be set before anything else
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '1');
ini_set('session.cookie_httponly', '1');

// ✅ content-type header after CORS
header("Content-Type: application/json");

// ✅ Handle OPTIONS preflight and exit early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ session_start AFTER cookie settings, AFTER CORS
session_start();

// ✅ config.php is in backend/ root, so path is ../config.php
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
if ($data === null) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON body"]);
    exit;
}

if (!isset($data['action'])) {
    echo json_encode(["status" => "error", "message" => "action not received"]);
    exit;
}

$action = $data['action'];

if ($action === "register") {

    if (
        !isset($data['userName']) ||
        !isset($data['orgName']) ||
        !isset($data['userEmail']) ||
        !isset($data['password'])
    ) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    $userName = $data['userName'];
    $orgName = $data['orgName'];
    $userEmail = $data['userEmail'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);

    $checkStmt = $conn->prepare("SELECT id FROM user WHERE email = ?");
    $checkStmt->bind_param("s", $userEmail);
    if (!$checkStmt->execute()) {
        echo json_encode(["status" => "error", "message" => "Email check failed"]);
        exit;
    }
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email already exists"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO user (name, org_name, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $userName, $orgName, $userEmail, $password);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Registered"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    exit;
}

elseif ($action === "login") {

    if (!isset($data['userEmail']) || !isset($data['password'])) {
        echo json_encode(["status" => "error", "message" => "Missing email or password"]);
        exit;
    }

    $userEmail = $data['userEmail'];
    $password = $data['password'];

    $stmt = $conn->prepare("SELECT id, name, org_name, email, password FROM user WHERE email = ?");
    $stmt->bind_param("s", $userEmail);
    if (!$stmt->execute()) {
        echo json_encode(["status" => "error", "message" => "Login query failed"]);
        exit;
    }

    $stmt->bind_result($id, $name, $orgName, $email, $hashedPassword);
    if ($stmt->fetch()) {
        if (password_verify($password, $hashedPassword)) {
            $_SESSION['user_id'] = $id; // ✅ SESSION SET
            $_SESSION['user_name']=$name;
            $_SESSION['user_org_name']=$orgName;
            $_SESSION['user_email']=$email;

            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user" => [
                    "id" => $id,
                    "name" => $name,
                    "org_name" => $orgName,
                    "email" => $email,
                ],
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect password"]);
            
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }

    exit;
}

else {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit;
}


//  if (
//     !isset($data['Email']) ||
//     !isset($data['pass'])
// ) {
//     echo json_encode(["status" => "error", "message" => "Missing required fields"]);
//     exit;
// }

// $email = $data['login_email'];
// $pass = $data['login_pass'];

// $stmt = $conn->prepare("SELECT email,password FROM user WHERE email="$email");
//     $stmt->bind_param("ss",$login_Email, $Login_pass);

//     if ($stmt->execute()) {
//     if($stmt->num_rows > 0 ) {
// if

//     }  
//     );
//     } else {
//         echo json_encode([
//             "status" => "error",
//             "message" => $stmt->error
//         ]);
//     }





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