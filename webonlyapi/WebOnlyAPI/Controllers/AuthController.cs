using Microsoft.AspNetCore.Mvc;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Services;

namespace WebOnlyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
            var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();

            var result = await _userService.LoginAsync(loginDto, ipAddress, userAgent);

            if (!result.Success)
                return Unauthorized(result);

            return Ok(result);
        }

        [HttpPost("logout")]
        public async Task<ActionResult<AuthResponseDto>> Logout([FromHeader(Name = "Authorization")] string? authorization)
        {
            if (string.IsNullOrEmpty(authorization) || !authorization.StartsWith("Bearer "))
                return BadRequest("Invalid authorization header");

            var token = authorization.Substring("Bearer ".Length);
            var result = await _userService.LogoutAsync(token);

            return Ok(result);
        }

        [HttpGet("validate")]
        public async Task<ActionResult<bool>> ValidateToken([FromHeader(Name = "Authorization")] string? authorization)
        {
            if (string.IsNullOrEmpty(authorization) || !authorization.StartsWith("Bearer "))
                return false;

            var token = authorization.Substring("Bearer ".Length);
            var isValid = await _userService.ValidateTokenAsync(token);

            return Ok(isValid);
        }

        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> GetCurrentUser([FromHeader(Name = "Authorization")] string? authorization)
        {
            if (string.IsNullOrEmpty(authorization) || !authorization.StartsWith("Bearer "))
                return Unauthorized("Invalid authorization header");

            var token = authorization.Substring("Bearer ".Length);
            var user = await _userService.GetUserByTokenAsync(token);

            if (user == null)
                return Unauthorized("Invalid or expired token");

            return Ok(user);
        }
    }
}
