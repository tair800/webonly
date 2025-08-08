namespace WebOnlyAPI.DTOs
{
    public class CreateReferenceDto
    {
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
    }

    public class UpdateReferenceDto
    {
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
    }

    public class ReferenceResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
