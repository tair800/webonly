using System.Net.Mail;
using System.Net;
using System.Text;

namespace WebOnlyAPI.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> SendPasswordResetEmailAsync(string email, string resetToken, string resetUrl)
        {
            try
            {
                var subject = "Şifrə Bərpası - WebOnly";
                var body = $@"
                    <!DOCTYPE html>
                    <html lang='az'>
                    <head>
                        <meta charset='UTF-8'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                        <title>Şifrə Bərpası</title>
                        <style>
                            body {{
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f4;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 10px;
                                overflow: hidden;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            }}
                            .header {{
                                background: linear-gradient(135deg, #17DBFC, #467EFE);
                                padding: 30px;
                                text-align: center;
                            }}
                            .logo {{
                                color: white;
                                font-size: 28px;
                                font-weight: bold;
                                margin: 0;
                                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                            }}
                            .content {{
                                padding: 40px 30px;
                                text-align: center;
                            }}
                            .title {{
                                color: #333;
                                font-size: 24px;
                                font-weight: 600;
                                margin-bottom: 20px;
                            }}
                            .description {{
                                color: #666;
                                font-size: 16px;
                                margin-bottom: 30px;
                                line-height: 1.6;
                            }}
                            .reset-button {{
                                display: inline-block;
                                background: linear-gradient(135deg, #17DBFC, #467EFE);
                                color: white;
                                text-decoration: none;
                                padding: 15px 30px;
                                border-radius: 25px;
                                font-weight: 600;
                                font-size: 16px;
                                margin: 20px 0;
                                transition: all 0.3s ease;
                                box-shadow: 0 4px 15px rgba(23, 219, 252, 0.3);
                            }}
                            .reset-button:hover {{
                                transform: translateY(-2px);
                                box-shadow: 0 6px 20px rgba(23, 219, 252, 0.4);
                            }}
                            .warning {{
                                background-color: #fff3cd;
                                border: 1px solid #ffeaa7;
                                border-radius: 8px;
                                padding: 15px;
                                margin: 20px 0;
                                color: #856404;
                            }}
                            .footer {{
                                background-color: #f8f9fa;
                                padding: 20px;
                                text-align: center;
                                color: #666;
                                font-size: 14px;
                            }}
                            .expiry {{
                                color: #dc3545;
                                font-weight: 600;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <div class='header'>
                                <h1 class='logo'>WebOnly</h1>
                            </div>
                            
                            <div class='content'>
                                <h2 class='title'>Şifrə Bərpası</h2>
                                <p class='description'>
                                    Şifrənizi bərpa etmək üçün tələb göndərdiniz. 
                                    Aşağıdakı düyməyə klikləyərək yeni şifrənizi təyin edə bilərsiniz.
                                </p>
                                
                                <a href='{resetUrl}?token={resetToken}' class='reset-button'>
                                    Şifrəni Bərpa Et
                                </a>
                                
                                <div class='warning'>
                                    <strong>Diqqət:</strong> Bu link 1 saat ərzində etibarlıdır. 
                                    Əgər siz şifrə bərpası tələb etməmisinizsə, bu emaili nəzərə almayın.
                                </div>
                                
                                <p class='description'>
                                    Əgər düymə işləmirsə, aşağıdakı linki brauzerinizə kopyalayın:
                                </p>
                                <p style='word-break: break-all; color: #17DBFC; font-size: 14px;'>
                                    {resetUrl}?token={resetToken}
                                </p>
                            </div>
                            
                            <div class='footer'>
                                <p>Bu email avtomatik olaraq göndərilmişdir. Cavablamayın.</p>
                                <p>© 2024 WebOnly. Bütün hüquqlar qorunur.</p>
                            </div>
                        </div>
                    </body>
                    </html>";

                return await SendEmailAsync(email, subject, body);
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SendEmailVerificationAsync(string email, string verificationToken, string verificationUrl)
        {
            try
            {
                var subject = "Email Təsdiqi - WebOnly";
                var body = $@"
                    <!DOCTYPE html>
                    <html lang='az'>
                    <head>
                        <meta charset='UTF-8'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                        <title>Email Təsdiqi</title>
                        <style>
                            body {{
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f4;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 10px;
                                overflow: hidden;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            }}
                            .header {{
                                background: linear-gradient(135deg, #17DBFC, #467EFE);
                                padding: 30px;
                                text-align: center;
                            }}
                            .logo {{
                                color: white;
                                font-size: 28px;
                                font-weight: bold;
                                margin: 0;
                                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                            }}
                            .content {{
                                padding: 40px 30px;
                                text-align: center;
                            }}
                            .title {{
                                color: #333;
                                font-size: 24px;
                                font-weight: 600;
                                margin-bottom: 20px;
                            }}
                            .description {{
                                color: #666;
                                font-size: 16px;
                                margin-bottom: 30px;
                                line-height: 1.6;
                            }}
                            .verify-button {{
                                display: inline-block;
                                background: linear-gradient(135deg, #17DBFC, #467EFE);
                                color: white;
                                text-decoration: none;
                                padding: 15px 30px;
                                border-radius: 25px;
                                font-weight: 600;
                                font-size: 16px;
                                margin: 20px 0;
                                transition: all 0.3s ease;
                                box-shadow: 0 4px 15px rgba(23, 219, 252, 0.3);
                            }}
                            .verify-button:hover {{
                                transform: translateY(-2px);
                                box-shadow: 0 6px 20px rgba(23, 219, 252, 0.4);
                            }}
                            .warning {{
                                background-color: #fff3cd;
                                border: 1px solid #ffeaa7;
                                border-radius: 8px;
                                padding: 15px;
                                margin: 20px 0;
                                color: #856404;
                            }}
                            .footer {{
                                background-color: #f8f9fa;
                                padding: 20px;
                                text-align: center;
                                color: #666;
                                font-size: 14px;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <div class='header'>
                                <h1 class='logo'>WebOnly</h1>
                            </div>
                            
                            <div class='content'>
                                <h2 class='title'>Email Ünvanınızı Təsdiqləyin</h2>
                                <p class='description'>
                                    WebOnly-də qeydiyyatdan keçdiyiniz üçün təşəkkür edirik! 
                                    Hesabınızı aktivləşdirmək üçün email ünvanınızı təsdiqləyin.
                                </p>
                                
                                <a href='{verificationUrl}?token={verificationToken}' class='verify-button'>
                                    Email-i Təsdiqlə
                                </a>
                                
                                <div class='warning'>
                                    <strong>Diqqət:</strong> Əgər siz hesab yaratmamısınızsa, bu emaili nəzərə almayın.
                                </div>
                                
                                <p class='description'>
                                    Əgər düymə işləmirsə, aşağıdakı linki brauzerinizə kopyalayın:
                                </p>
                                <p style='word-break: break-all; color: #17DBFC; font-size: 14px;'>
                                    {verificationUrl}?token={verificationToken}
                                </p>
                            </div>
                            
                            <div class='footer'>
                                <p>Bu email avtomatik olaraq göndərilmişdir. Cavablamayın.</p>
                                <p>© 2024 WebOnly. Bütün hüquqlar qorunur.</p>
                            </div>
                        </div>
                    </body>
                    </html>";

                return await SendEmailAsync(email, subject, body);
            }
            catch
            {
                return false;
            }
        }

        private async Task<bool> SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                // For development, you can use a service like SendGrid, MailKit, or configure SMTP
                // This is a basic example using SMTP
                var smtpServer = _configuration["Email:SmtpServer"] ?? "smtp.gmail.com";
                var smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
                var smtpUsername = _configuration["Email:Username"] ?? "";
                var smtpPassword = _configuration["Email:Password"] ?? "";
                var fromEmail = _configuration["Email:FromEmail"] ?? "noreply@webonly.com";

                using var client = new SmtpClient(smtpServer, smtpPort)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(smtpUsername, smtpPassword)
                };

                var message = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                message.To.Add(to);

                await client.SendMailAsync(message);
                return true;
            }
            catch
            {
                // For development, you might want to log this or use a mock email service
                return false;
            }
        }
    }
}
