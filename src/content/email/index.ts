export const contentEmail = {
  sendActivationCode: {
    subject: `Active Your Account`,
    content: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Activate Your Account</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                font-size: 24px;
                font-weight: bold;
                color: #4CAF50;
            }
            .content {
                font-size: 16px;
                margin: 20px 0;
                color: #333;
            }
            .activation-code {
                display: inline-block;
                font-size: 20px;
                font-weight: bold;
                color: #ffffff;
                background-color: #4CAF50;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 10px;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 25px;
                font-size: 18px;
                color: #ffffff;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Activate Your Account</div>
            <div class="content">
                Hello <strong>{{name}}</strong>,<br><br>
                Thank you for registering with us. Please use the activation code below to complete your registration process.
            </div>
            <div class="activation-code">{{activationCode}}</div>
            <br>
            <div class="footer">
                If you did not request this registration, please ignore this email.<br>
                Thank you for choosing our service!<br><br>
                &copy; 2025 Organic Food Store
            </div>
        </div>
    </body>
</html>`,
  },
  sendResetPassCode: {
    subject: `Reset your account`,
    content: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                font-size: 24px;
                font-weight: bold;
                color: #ff9800;
            }
            .content {
                font-size: 16px;
                margin: 20px 0;
                color: #333;
            }
            .reset-code {
                display: inline-block;
                font-size: 20px;
                font-weight: bold;
                color: #ffffff;
                background-color: #ff9800;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 10px;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 25px;
                font-size: 18px;
                color: #ffffff;
                background-color: #ff9800;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Reset Your Password</div>
            <div class="content">
                You have requested to reset your password. Please use the reset code below to proceed.
            </div>
            <div class="reset-code">{{resetCode}}</div>
            <br>
            <div class="footer">
                If you did not request a password reset, please ignore this email.<br>
                Thank you for using our service!<br><br>
                &copy; 2025 Organic Food Store
            </div>
        </div>
    </body>
</html>`,
  },
};
