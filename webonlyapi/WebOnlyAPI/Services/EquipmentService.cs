using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.DTOs;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Services
{
    public class EquipmentService : IEquipmentService
    {
        private readonly ApplicationDbContext _context;
        public EquipmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EquipmentListResponseDto>> GetAllAsync()
        {
            var list = await _context.Equipment
                .OrderBy(e => e.CreatedAt)
                .Select(e => new EquipmentListResponseDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Version = e.Version,
                    Core = e.Core,
                    ImageUrl = e.ImageUrl
                })
                .ToListAsync();
            return list;
        }

        public async Task<IEnumerable<EquipmentResponseDto>> GetAllFullAsync()
        {
            var list = await _context.Equipment
                .OrderBy(e => e.CreatedAt)
                .ToListAsync();
            return list.Select(MapToResponse);
        }

        public async Task<EquipmentResponseDto?> GetByIdAsync(int id)
        {
            var e = await _context.Equipment.FindAsync(id);
            return e == null ? null : MapToResponse(e);
        }

        public async Task<EquipmentResponseDto> CreateAsync(CreateEquipmentDto dto)
        {
            var e = new Equipment
            {
                Name = dto.Name,
                Version = dto.Version,
                Core = dto.Core,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                CreatedAt = DateTime.UtcNow
            };
            _context.Equipment.Add(e);
            await _context.SaveChangesAsync();
            return MapToResponse(e);
        }

        public async Task<EquipmentResponseDto?> UpdateAsync(int id, UpdateEquipmentDto dto)
        {
            var e = await _context.Equipment.FindAsync(id);
            if (e == null) return null;

            e.Name = dto.Name;
            e.Version = dto.Version;
            e.Core = dto.Core;
            e.Description = dto.Description;
            e.ImageUrl = dto.ImageUrl;
            e.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return MapToResponse(e);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var e = await _context.Equipment.FindAsync(id);
            if (e == null) return false;
            _context.Equipment.Remove(e);
            await _context.SaveChangesAsync();
            return true;
        }

        private static EquipmentResponseDto MapToResponse(Equipment e)
        {
            return new EquipmentResponseDto
            {
                Id = e.Id,
                Name = e.Name,
                Version = e.Version,
                Core = e.Core,
                Description = e.Description,
                ImageUrl = e.ImageUrl,
                CreatedAt = e.CreatedAt,
                UpdatedAt = e.UpdatedAt
            };
        }
    }
}
