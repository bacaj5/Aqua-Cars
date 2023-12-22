using AquaCars.DTOs.SubCategoryDTOs;
using AquaCars.Responses;

namespace AquaCars.Services.Interfaces
{
    public interface ISubCategoryService
    {
        Task<SubCategoryDTO> GetSubCategory(int id);
        Task<List<SubCategoryDTO>> GetAllSubCategories();
        Task<ApiResponse> AddSubCategory(AddSubCategoryDTO dto);
        Task<ApiResponse> EditSubCategory(EditSubCategoryDTO dto);
        Task<ApiResponse> DeleteSubCategory(DeleteSubCategoryDTO dto);
    }
}
