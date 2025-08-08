using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? Features { get; set; }
        
        [StringLength(100)]
        public string? Title { get; set; }
        
        [StringLength(1000)]
        public string? Specs { get; set; }
        
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
