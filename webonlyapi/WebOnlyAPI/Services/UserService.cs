using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Models;
using WebOnlyAPI.Services;

namespace WebOnlyAPI.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;
        private readonly EmailService _emailService;

        public UserService(ApplicationDbContext context, JwtService jwtService, EmailService emailService)
        {
            _context = context;
            _jwtService = jwtService;
            _emailService = emailService;
        }

        public async Task<UserResponseDto?> RegisterAsync(RegisterUserDto registerDto)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return null; // User already exists
            }

            if (await _context.Users.AnyAsync(u => u.Username == registerDto.Username))
            {
                return null; // Username already taken
            }

            // Hash password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            // Generate email verification token
            var verificationToken = Guid.NewGuid().ToString();

            var user = new User
            {
                Email = registerDto.Email,
                Username = registerDto.Username,
                PasswordHash = passwordHash,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Role = "User",
                EmailVerificationToken = verificationToken,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Send verification email
            var verificationUrl = "http://localhost:5173/verify-email"; // Frontend URL
            await _emailService.SendEmailVerificationAsync(user.Email, verificationToken, verificationUrl);

            // Generate JWT token
            var token = _jwtService.GenerateToken(user);

            return MapToResponseDto(user, token);
        }

        public async Task<UserResponseDto?> LoginAsync(LoginUserDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return null; // Invalid credentials
            }

            if (!user.IsActive)
            {
                return null; // User is deactivated
            }

            // Update last login
            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            // Generate JWT token
            var token = _jwtService.GenerateToken(user);

            return MapToResponseDto(user, token);
        }

        public async Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == forgotPasswordDto.Email);

            if (user == null)
            {
                return false; // User not found
            }

            // Generate password reset token
            var resetToken = Guid.NewGuid().ToString();
            user.PasswordResetToken = resetToken;
            user.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1); // Token expires in 1 hour

            await _context.SaveChangesAsync();

            // Send password reset email
            var resetUrl = "http://localhost:5173/reset-password"; // Frontend URL
            return await _emailService.SendPasswordResetEmailAsync(user.Email, resetToken, resetUrl);
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => 
                u.PasswordResetToken == resetPasswordDto.Token && 
                u.PasswordResetTokenExpiry > DateTime.UtcNow);

            if (user == null)
            {
                return false; // Invalid or expired token
            }

            // Hash new password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.NewPassword);
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = null;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> VerifyEmailAsync(string token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.EmailVerificationToken == token);

            if (user == null)
            {
                return false; // Invalid token
            }

            user.IsEmailVerified = true;
            user.EmailVerificationToken = null;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return false; // User not found
            }

            // Verify current password
            if (!BCrypt.Net.BCrypt.Verify(changePasswordDto.CurrentPassword, user.PasswordHash))
            {
                return false; // Current password is incorrect
            }

            // Hash new password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserProfileDto?> GetUserProfileAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return null;
            }

            return new UserProfileDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                IsEmailVerified = user.IsEmailVerified,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt
            };
        }

        public async Task<bool> UpdateProfileAsync(int userId, UserProfileDto profileDto)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return false;
            }

            // Check if email is already taken by another user
            if (profileDto.Email != user.Email && 
                await _context.Users.AnyAsync(u => u.Email == profileDto.Email))
            {
                return false;
            }

            // Check if username is already taken by another user
            if (profileDto.Username != user.Username && 
                await _context.Users.AnyAsync(u => u.Username == profileDto.Username))
            {
                return false;
            }

            user.FirstName = profileDto.FirstName;
            user.LastName = profileDto.LastName;

            await _context.SaveChangesAsync();
            return true;
        }

        private static UserResponseDto MapToResponseDto(User user, string token)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                IsEmailVerified = user.IsEmailVerified,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt,
                Token = token
            };
        }
    }
}
