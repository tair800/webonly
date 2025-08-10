using Microsoft.AspNetCore.Mvc;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Services;

namespace WebOnlyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.RegisterAsync(registerDto);

            if (result == null)
            {
                return BadRequest(new { message = "User with this email or username already exists" });
            }

            return Ok(new { 
                message = "Registration successful. Please check your email to verify your account.",
                user = result 
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.LoginAsync(loginDto);

            if (result == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(new { 
                message = "Login successful",
                user = result 
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.ForgotPasswordAsync(forgotPasswordDto);

            if (result)
            {
                return Ok(new { message = "Password reset email sent. Please check your email." });
            }

            return Ok(new { message = "If an account with that email exists, a password reset email has been sent." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.ResetPasswordAsync(resetPasswordDto);

            if (result)
            {
                return Ok(new { message = "Password reset successful" });
            }

            return BadRequest(new { message = "Invalid or expired reset token" });
        }

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Verification token is required" });
            }

            var result = await _userService.VerifyEmailAsync(token);

            if (result)
            {
                return Ok(new { message = "Email verified successfully" });
            }

            return BadRequest(new { message = "Invalid verification token" });
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get user ID from JWT token (you'll need to implement JWT middleware)
            var userId = GetUserIdFromToken();

            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var result = await _userService.ChangePasswordAsync(userId.Value, changePasswordDto);

            if (result)
            {
                return Ok(new { message = "Password changed successfully" });
            }

            return BadRequest(new { message = "Current password is incorrect" });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = GetUserIdFromToken();

            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var profile = await _userService.GetUserProfileAsync(userId.Value);

            if (profile == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(profile);
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserProfileDto profileDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserIdFromToken();

            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var result = await _userService.UpdateProfileAsync(userId.Value, profileDto);

            if (result)
            {
                return Ok(new { message = "Profile updated successfully" });
            }

            return BadRequest(new { message = "Email or username already taken" });
        }

        private int? GetUserIdFromToken()
        {
            // This is a placeholder - you'll need to implement JWT middleware
            // to extract the user ID from the JWT token
            // For now, return null to indicate no authentication
            return null;
        }
    }
}
