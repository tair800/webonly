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
                .Include(e => e.CategoryMappings)
                    .ThenInclude(cm => cm.Category)
                .Include(e => e.TagMappings)
                    .ThenInclude(tm => tm.Tag)
                .OrderBy(e => e.CreatedAt)
                .Select(e => new EquipmentListResponseDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Version = e.Version,
                    Core = e.Core,
                    ImageUrl = e.ImageUrl,
                    CategoryNames = e.CategoryMappings.Select(cm => cm.Category.Name).ToList(),
                    TagNames = e.TagMappings.Select(tm => tm.Tag.Name).ToList()
                })
                .ToListAsync();
            return list;
        }

        public async Task<IEnumerable<EquipmentResponseDto>> GetAllFullAsync()
        {
            var list = await _context.Equipment
                .Include(e => e.FeaturesList.OrderBy(f => f.OrderIndex))
                .Include(e => e.Specifications.OrderBy(s => s.OrderIndex))
                .Include(e => e.CategoryMappings)
                    .ThenInclude(cm => cm.Category)
                .Include(e => e.TagMappings)
                    .ThenInclude(tm => tm.Tag)
                .OrderBy(e => e.CreatedAt)
                .ToListAsync();
            return list.Select(MapToResponse);
        }

        public async Task<EquipmentResponseDto?> GetByIdAsync(int id)
        {
            var e = await _context.Equipment
                .Include(eq => eq.FeaturesList.OrderBy(f => f.OrderIndex))
                .Include(eq => eq.Specifications.OrderBy(s => s.OrderIndex))
                .Include(eq => eq.CategoryMappings)
                    .ThenInclude(cm => cm.Category)
                .Include(eq => eq.TagMappings)
                    .ThenInclude(tm => tm.Tag)
                .FirstOrDefaultAsync(eq => eq.Id == id);
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

            // Add category mappings
            if (dto.CategoryIds?.Any() == true)
            {
                foreach (var categoryId in dto.CategoryIds)
                {
                    var categoryMapping = new EquipmentCategoryMapping
                    {
                        EquipmentId = e.Id,
                        CategoryId = categoryId
                    };
                    _context.EquipmentCategoryMapping.Add(categoryMapping);
                }
            }

            // Add tag mappings
            if (dto.TagIds?.Any() == true)
            {
                foreach (var tagId in dto.TagIds)
                {
                    var tagMapping = new EquipmentTagMapping
                    {
                        EquipmentId = e.Id,
                        TagId = tagId
                    };
                    _context.EquipmentTagMapping.Add(tagMapping);
                }
            }

            await _context.SaveChangesAsync();
            return MapToResponse(e);
        }

        public async Task<EquipmentResponseDto?> UpdateAsync(int id, UpdateEquipmentDto dto)
        {
            var e = await _context.Equipment
                .Include(eq => eq.CategoryMappings)
                .Include(eq => eq.TagMappings)
                .FirstOrDefaultAsync(eq => eq.Id == id);
            
            if (e == null) return null;

            e.Name = dto.Name;
            e.Version = dto.Version;
            e.Core = dto.Core;
            e.Description = dto.Description;
            e.ImageUrl = dto.ImageUrl;
            e.UpdatedAt = DateTime.UtcNow;

            // Update category mappings
            if (dto.CategoryIds?.Any() == true)
            {
                // Remove existing category mappings
                _context.EquipmentCategoryMapping.RemoveRange(e.CategoryMappings);
                
                // Add new category mappings
                foreach (var categoryId in dto.CategoryIds)
                {
                    var categoryMapping = new EquipmentCategoryMapping
                    {
                        EquipmentId = e.Id,
                        CategoryId = categoryId
                    };
                    _context.EquipmentCategoryMapping.Add(categoryMapping);
                }
            }

            // Update tag mappings
            if (dto.TagIds?.Any() == true)
            {
                // Remove existing tag mappings
                _context.EquipmentTagMapping.RemoveRange(e.TagMappings);
                
                // Add new tag mappings
                foreach (var tagId in dto.TagIds)
                {
                    var tagMapping = new EquipmentTagMapping
                    {
                        EquipmentId = e.Id,
                        TagId = tagId
                    };
                    _context.EquipmentTagMapping.Add(tagMapping);
                }
            }

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
                UpdatedAt = e.UpdatedAt,
                Features = e.FeaturesList.Select(f => new EquipmentFeatureDto
                {
                    Id = f.Id,
                    Feature = f.Feature,
                    OrderIndex = f.OrderIndex
                }).ToList(),
                Specifications = e.Specifications.Select(s => new EquipmentSpecificationDto
                {
                    Id = s.Id,
                    Key = s.Key,
                    Value = s.Value,
                    OrderIndex = s.OrderIndex
                }).ToList(),
                Categories = e.CategoryMappings.Select(cm => new EquipmentCategoryDto
                {
                    Id = cm.Category.Id,
                    Name = cm.Category.Name,
                    Description = cm.Category.Description,
                    Icon = cm.Category.Icon,
                    Color = cm.Category.Color,
                    OrderIndex = cm.Category.OrderIndex
                }).ToList(),
                Tags = e.TagMappings.Select(tm => new EquipmentTagDto
                {
                    Id = tm.Tag.Id,
                    Name = tm.Tag.Name,
                    Description = tm.Tag.Description,
                    Color = tm.Tag.Color,
                    OrderIndex = tm.Tag.OrderIndex
                }).ToList()
            };
        }

        public async Task<IEnumerable<object>> GetCategoriesAsync()
        {
            var categories = await _context.EquipmentCategories
                .Where(c => c.IsActive)
                .OrderBy(c => c.OrderIndex)
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description,
                    c.Icon,
                    c.Color,
                    c.OrderIndex,
                    EquipmentCount = c.EquipmentMappings.Count
                })
                .ToListAsync();
            return categories;
        }

        public async Task<IEnumerable<object>> GetTagsAsync()
        {
            var tags = await _context.EquipmentTags
                .Where(t => t.IsActive)
                .OrderBy(t => t.OrderIndex)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Description,
                    t.Color,
                    t.OrderIndex
                })
                .ToListAsync();
            return tags;
        }

        public async Task<IEnumerable<EquipmentResponseDto>> SearchByNameAsync(string searchTerm)
        {
            var results = await _context.Equipment
                .Include(e => e.FeaturesList.OrderBy(f => f.OrderIndex))
                .Include(e => e.Specifications.OrderBy(s => s.OrderIndex))
                .Include(e => e.CategoryMappings)
                    .ThenInclude(cm => cm.Category)
                .Include(e => e.TagMappings)
                    .ThenInclude(tm => tm.Tag)
                .Where(e => e.Name.ToLower().StartsWith(searchTerm.ToLower()))
                .OrderBy(e => e.CreatedAt)
                .ToListAsync();

            return results.Select(MapToResponse);
        }
    }
}
