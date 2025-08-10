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
                var subject = "Password Reset Request";
                var body = $@"
                    <html>
                    <body>
                        <h2>Password Reset Request</h2>
                        <p>You have requested to reset your password.</p>
                        <p>Click the link below to reset your password:</p>
                        <p><a href='{resetUrl}?token={resetToken}'>Reset Password</a></p>
                        <p>If you didn't request this, please ignore this email.</p>
                        <p>This link will expire in 1 hour.</p>
                        <br>
                        <p>Best regards,<br>WebOnly Team</p>
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
                var subject = "Email Verification";
                var body = $@"
                    <html>
                    <body>
                        <h2>Verify Your Email</h2>
                        <p>Thank you for registering with WebOnly!</p>
                        <p>Please click the link below to verify your email address:</p>
                        <p><a href='{verificationUrl}?token={verificationToken}'>Verify Email</a></p>
                        <p>If you didn't create an account, please ignore this email.</p>
                        <br>
                        <p>Best regards,<br>WebOnly Team</p>
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
