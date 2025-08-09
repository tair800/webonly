using Microsoft.AspNetCore.Mvc;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Services;

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
        public async Task<ActionResult<EquipmentResponseDto>> Create(CreateEquipmentDto dto)
        {
            var created = await _equipmentService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EquipmentResponseDto>> Update(int id, UpdateEquipmentDto dto)
        {
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
