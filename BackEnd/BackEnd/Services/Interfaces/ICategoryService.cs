using AquaCars.DTOs.CategoryDTOs;
using AquaCars.Responses;

namespace AquaCars.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryDTO> GetCategory(int id);
        Task<List<CategoryDTO>> GetAllCategories();
        Task<ApiResponse> AddCategory(AddCategoryDTO dto);
        Task<ApiResponse> EditCategory (EditCategoryDTO dto);
        Task<ApiResponse> DeleteCategory(DeleteCategoryDTO dto);

    }
}
