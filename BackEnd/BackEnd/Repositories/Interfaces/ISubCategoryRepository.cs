using AquaCars.DTOs.SubCategoryDTOs;
using AquaCars.Models;

namespace AquaCars.Repositories.Interfaces
{
    public interface ISubCategoryRepository
    {
        Task<SubCategory> GetSubCategory(int id);
        Task<List<SubCategory>> GetAllSubCategories();
        Task<SubCategory> AddSubCategory(SubCategory dto);
        Task<SubCategory> EditSubCategory(SubCategory dto);
        Task<SubCategory> DeleteSubCategory(SubCategory dto);
    }
}
