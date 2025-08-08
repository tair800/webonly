using System.ComponentModel.DataAnnotations;

namespace WebOnlyAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Heading { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string JobName { get; set; } = string.Empty;
        
        [StringLength(20)]
        public string? Telefon { get; set; }
        
        [EmailAddress]
        [StringLength(100)]
        public string? Mail { get; set; }
        
        [StringLength(200)]
        public string? LinkedIn { get; set; }
        
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
