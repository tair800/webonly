using Microsoft.AspNetCore.Mvc;
using WebOnlyAPI.Services;
using WebOnlyAPI.DTOs;

namespace WebOnlyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceResponseDto>>> GetAllServices()
        {
            var services = await _serviceService.GetAllServicesAsync();
            return Ok(services);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponseDto>> GetServiceById(int id)
        {
            var service = await _serviceService.GetServiceByIdAsync(id);
            if (service == null)
                return NotFound();

            return Ok(service);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponseDto>> CreateService(CreateServiceDto createServiceDto)
        {
            var service = await _serviceService.CreateServiceAsync(createServiceDto);
            return CreatedAtAction(nameof(GetServiceById), new { id = service.Id }, service);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponseDto>> UpdateService(int id, UpdateServiceDto updateServiceDto)
        {
            var service = await _serviceService.UpdateServiceAsync(id, updateServiceDto);
            if (service == null)
                return NotFound();

            return Ok(service);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteService(int id)
        {
            var result = await _serviceService.DeleteServiceAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
