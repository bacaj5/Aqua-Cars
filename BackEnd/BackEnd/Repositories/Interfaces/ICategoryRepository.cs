using AquaCars.DTOs.CategoryDTOs;
using AquaCars.Models;

namespace AquaCars.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<Category> GetCategory(int id);
        Task<List<Category>> GetAllCategories();
        Task<Category> AddCategory(Category dto);
        Task<Category> EditCategory(Category dto);
        Task<Category> DeleteCategory(Category dto);
    }
}
