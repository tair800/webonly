using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? Subtext { get; set; }
        
        [StringLength(100)]
        public string? Icon { get; set; }
        
        [StringLength(100)]
        public string? Alt { get; set; }
        
        [StringLength(100)]
        public string? Path { get; set; }
        
        [StringLength(500)]
        public string? MainImage { get; set; }
        
        [StringLength(2000)]
        public string? Description { get; set; }
        
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public ICollection<ProductSection> Sections { get; set; } = new List<ProductSection>();
    }
}
