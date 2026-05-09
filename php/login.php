<?php
$studentNo = isset($_POST['studentNo']) ? $_POST['studentNo'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$studentPrefix = explode('@', $studentNo)[0];

if ($studentPrefix === $password && $studentPrefix !== '') {
    // Giriş başarılı
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hoşgeldiniz</title>
  <link rel="stylesheet" href="../css/style.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Outfit', sans-serif;
    }
    .welcome-bg {
      background: linear-gradient(135deg, #e8d8c0 0%, #d4b572 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .welcome-card {
      background: rgba(253, 246, 236, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      padding: 60px 40px;
      text-align: center;
      max-width: 550px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(61, 61, 42, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    .welcome-card h1 {
      font-family: 'Playfair Display', serif;
      font-size: 44px;
      color: #3d3d2a;
      margin-bottom: 20px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    .welcome-card p {
      font-size: 18px;
      color: #555;
      margin-bottom: 40px;
    }
    .btn-welcome {
      background-color: #4a4a35;
      color: white;
      padding: 14px 35px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 1px;
      display: inline-block;
      transition: all 0.3s ease;
      border: none;
    }
    .btn-welcome:hover {
      background-color: #2b2b1d;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(43, 43, 29, 0.2);
    }
  </style>
</head>
<body>
  <div class="welcome-bg">
    <div class="welcome-card">
      <h1>Hoşgeldiniz <?php echo htmlspecialchars($studentPrefix); ?></h1>
      <p>Giriş işleminiz başarıyla tamamlandı.</p>
      <a href="../index.html" class="btn-welcome">Ana Sayfaya Dön</a>
    </div>
  </div>
</body>
</html>
<?php
} else {
    // Başarısız ise login sayfasına geri dön
    header("Location: ../login.html");
    exit();
}
?>
