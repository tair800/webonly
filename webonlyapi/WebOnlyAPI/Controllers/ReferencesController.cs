using Microsoft.AspNetCore.Mvc;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Services;

namespace WebOnlyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReferencesController : ControllerBase
    {
        private readonly IReferenceService _referenceService;
        public ReferencesController(IReferenceService referenceService)
        {
            _referenceService = referenceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReferenceResponseDto>>> GetAll()
        {
            var items = await _referenceService.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReferenceResponseDto>> GetById(int id)
        {
            var item = await _referenceService.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<ReferenceResponseDto>> Create(CreateReferenceDto dto)
        {
            var created = await _referenceService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ReferenceResponseDto>> Update(int id, UpdateReferenceDto dto)
        {
            var updated = await _referenceService.UpdateAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _referenceService.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
