using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Services
{
    public class ReferenceService : IReferenceService
    {
        private readonly ApplicationDbContext _context;
        public ReferenceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReferenceResponseDto>> GetAllAsync()
        {
            return await _context.References
                .OrderBy(r => r.Id)
                .Select(r => new ReferenceResponseDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    ImageUrl = r.ImageUrl,
                    Alt = r.Alt
                })
                .ToListAsync();
        }

        public async Task<ReferenceResponseDto?> GetByIdAsync(int id)
        {
            var r = await _context.References.FindAsync(id);
            if (r == null) return null;
            return new ReferenceResponseDto { Id = r.Id, Name = r.Name, ImageUrl = r.ImageUrl, Alt = r.Alt };
        }

        public async Task<ReferenceResponseDto> CreateAsync(CreateReferenceDto dto)
        {
            var r = new Reference { Name = dto.Name, ImageUrl = dto.ImageUrl, Alt = dto.Alt, CreatedAt = DateTime.UtcNow };
            _context.References.Add(r);
            await _context.SaveChangesAsync();
            return new ReferenceResponseDto { Id = r.Id, Name = r.Name, ImageUrl = r.ImageUrl, Alt = r.Alt };
        }

        public async Task<ReferenceResponseDto?> UpdateAsync(int id, UpdateReferenceDto dto)
        {
            var r = await _context.References.FindAsync(id);
            if (r == null) return null;
            r.Name = dto.Name;
            r.ImageUrl = dto.ImageUrl;
            r.Alt = dto.Alt;
            r.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return new ReferenceResponseDto { Id = r.Id, Name = r.Name, ImageUrl = r.ImageUrl, Alt = r.Alt };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var r = await _context.References.FindAsync(id);
            if (r == null) return false;
            _context.References.Remove(r);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
