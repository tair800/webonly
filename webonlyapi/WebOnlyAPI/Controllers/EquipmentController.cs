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
        public async Task<ActionResult<EquipmentResponseDto>> Create([FromBody] CreateEquipmentDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await _equipmentService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EquipmentResponseDto>> Update(int id, [FromBody] UpdateEquipmentDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<object>>> GetCategories()
        {
            var categories = await _equipmentService.GetCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("tags")]
        public async Task<ActionResult<IEnumerable<object>>> GetTags()
        {
            var tags = await _equipmentService.GetTagsAsync();
            return Ok(tags);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<EquipmentResponseDto>>> Search([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q))
                return Ok(new List<EquipmentResponseDto>());

            var results = await _equipmentService.SearchByNameAsync(q);
            return Ok(results);
        }
    }
}
