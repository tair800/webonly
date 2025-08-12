using System;
using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.DTOs
{
    public class CreateEquipmentDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [StringLength(100)]
        public string? Version { get; set; }
        [StringLength(100)]
        public string? Core { get; set; }
        [StringLength(2000)]
        public string? Description { get; set; }
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        public List<int> CategoryIds { get; set; } = new List<int>();
        public List<int> TagIds { get; set; } = new List<int>();
    }

    public class UpdateEquipmentDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [StringLength(100)]
        public string? Version { get; set; }
        [StringLength(100)]
        public string? Core { get; set; }
        [StringLength(2000)]
        public string? Description { get; set; }
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        public List<int> CategoryIds { get; set; } = new List<int>();
        public List<int> TagIds { get; set; } = new List<int>();
    }

    public class EquipmentResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Version { get; set; }
        public string? Core { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<EquipmentFeatureDto> Features { get; set; } = new List<EquipmentFeatureDto>();
        public List<EquipmentSpecificationDto> Specifications { get; set; } = new List<EquipmentSpecificationDto>();
        public List<EquipmentCategoryDto> Categories { get; set; } = new List<EquipmentCategoryDto>();
        public List<EquipmentTagDto> Tags { get; set; } = new List<EquipmentTagDto>();
    }

    public class EquipmentFeatureDto
    {
        public int Id { get; set; }
        public string Feature { get; set; } = string.Empty;
        public int OrderIndex { get; set; }
    }

    public class EquipmentSpecificationDto
    {
        public int Id { get; set; }
        public string Key { get; set; } = string.Empty;
        public string? Value { get; set; }
        public int OrderIndex { get; set; }
    }

    public class EquipmentCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public int OrderIndex { get; set; }
    }

    public class EquipmentTagDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Color { get; set; }
        public int OrderIndex { get; set; }
    }
}
