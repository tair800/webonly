using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _context;

        public EmployeeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeeResponseDto>> GetAllEmployeesAsync()
        {
            var employees = await _context.Employees
                .OrderBy(e => e.CreatedAt)
                .ToListAsync();

            return employees.Select(MapToResponseDto);
        }

        public async Task<EmployeeResponseDto?> GetEmployeeByIdAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            return employee != null ? MapToResponseDto(employee) : null;
        }

        public async Task<EmployeeResponseDto> CreateEmployeeAsync(CreateEmployeeDto createDto)
        {
            var employee = new Employee
            {
                Heading = createDto.Heading,
                JobName = createDto.JobName,
                Telefon = createDto.Telefon,
                Mail = createDto.Mail,
                LinkedIn = createDto.LinkedIn,
                ImageUrl = createDto.ImageUrl,
                CreatedAt = DateTime.UtcNow
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return MapToResponseDto(employee);
        }

        public async Task<EmployeeResponseDto?> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateDto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return null;

            employee.Heading = updateDto.Heading;
            employee.JobName = updateDto.JobName;
            employee.Telefon = updateDto.Telefon;
            employee.Mail = updateDto.Mail;
            employee.LinkedIn = updateDto.LinkedIn;
            employee.ImageUrl = updateDto.ImageUrl;
            employee.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToResponseDto(employee);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return false;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return true;
        }

        private static EmployeeResponseDto MapToResponseDto(Employee employee)
        {
            return new EmployeeResponseDto
            {
                Id = employee.Id,
                Heading = employee.Heading,
                JobName = employee.JobName,
                Telefon = employee.Telefon,
                Mail = employee.Mail,
                LinkedIn = employee.LinkedIn,
                ImageUrl = employee.ImageUrl,
                CreatedAt = employee.CreatedAt,
                UpdatedAt = employee.UpdatedAt
            };
        }
    }
}
