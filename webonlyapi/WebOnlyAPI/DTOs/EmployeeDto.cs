namespace WebOnlyAPI.DTOs
{
    public class CreateEmployeeDto
    {
        public string Heading { get; set; } = string.Empty;
        public string JobName { get; set; } = string.Empty;
        public string? Telefon { get; set; }
        public string? Mail { get; set; }
        public string? LinkedIn { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class UpdateEmployeeDto
    {
        public string Heading { get; set; } = string.Empty;
        public string JobName { get; set; } = string.Empty;
        public string? Telefon { get; set; }
        public string? Mail { get; set; }
        public string? LinkedIn { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class EmployeeResponseDto
    {
        public int Id { get; set; }
        public string Heading { get; set; } = string.Empty;
        public string JobName { get; set; } = string.Empty;
        public string? Telefon { get; set; }
        public string? Mail { get; set; }
        public string? LinkedIn { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
