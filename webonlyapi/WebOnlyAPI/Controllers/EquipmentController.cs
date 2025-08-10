using Microsoft.AspNetCore.Mvc;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Services;
using System.IO;

namespace WebOnlyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentService _equipmentService;
        public EquipmentController(IEquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipmentListResponseDto>>> GetAll()
        {
            var items = await _equipmentService.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("full")]
        public async Task<ActionResult<IEnumerable<EquipmentResponseDto>>> GetAllFull()
        {
            var items = await _equipmentService.GetAllFullAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EquipmentResponseDto>> GetById(int id)
        {
            var item = await _equipmentService.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<EquipmentResponseDto>> Create([FromForm] CreateEquipmentDto dto, IFormFile? imageFile)
        {
            // Handle image file if provided
            if (imageFile != null && imageFile.Length > 0)
            {
                var fileName = $"{DateTime.Now:yyyyMMddHHmmssfff}_{imageFile.FileName}";
                var uploadPath = Path.Combine("wwwroot", "uploads", "equipment");
                
                // Create directory if it doesn't exist
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                
                var filePath = Path.Combine(uploadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                
                // Set the image URL to the uploaded file path
                dto.ImageUrl = $"/uploads/equipment/{fileName}";
            }
            
            var created = await _equipmentService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EquipmentResponseDto>> Update(int id, [FromForm] UpdateEquipmentDto dto, IFormFile? imageFile)
        {
            // Handle image file if provided
            if (imageFile != null && imageFile.Length > 0)
            {
                var fileName = $"{DateTime.Now:yyyyMMddHHmmssfff}_{imageFile.FileName}";
                var uploadPath = Path.Combine("wwwroot", "uploads", "equipment");
                
                // Create directory if it doesn't exist
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                
                var filePath = Path.Combine(uploadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                
                // Set the image URL to the uploaded file path
                dto.ImageUrl = $"/uploads/equipment/{fileName}";
            }
            
            var updated = await _equipmentService.UpdateAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _equipmentService.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
