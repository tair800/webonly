namespace WebOnlyAPI.DTOs
{
    public class CreateServiceDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Subtext { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class UpdateServiceDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Subtext { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class ServiceResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Subtext { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
