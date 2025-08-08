namespace WebOnlyAPI.DTOs
{
    public class CreateEquipmentDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Features { get; set; }
        public string? Title { get; set; }
        public string? Specs { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class UpdateEquipmentDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Features { get; set; }
        public string? Title { get; set; }
        public string? Specs { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class EquipmentResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Features { get; set; }
        public string? Title { get; set; }
        public string? Specs { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
