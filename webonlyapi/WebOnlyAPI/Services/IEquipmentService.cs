using WebOnlyAPI.DTOs;

namespace WebOnlyAPI.Services
{
    public interface IEquipmentService
    {
        Task<IEnumerable<EquipmentListResponseDto>> GetAllAsync();
        Task<IEnumerable<EquipmentResponseDto>> GetAllFullAsync();
        Task<EquipmentResponseDto?> GetByIdAsync(int id);
        Task<EquipmentResponseDto> CreateAsync(CreateEquipmentDto dto);
        Task<EquipmentResponseDto?> UpdateAsync(int id, UpdateEquipmentDto dto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<object>> GetCategoriesAsync();
        Task<IEnumerable<object>> GetTagsAsync();
        Task<IEnumerable<EquipmentResponseDto>> SearchByNameAsync(string searchTerm);
    }
}
