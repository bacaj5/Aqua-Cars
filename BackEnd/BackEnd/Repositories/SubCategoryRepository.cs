using AquaCars.Models;
using AquaCars.Persistence;
using AquaCars.Repositories.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AquaCars.Repositories
{
    public class SubCategoryRepository : ISubCategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public SubCategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SubCategory> AddSubCategory(SubCategory subCategory)
        {
            await _context.SubCategories.AddAsync(subCategory);
            await _context.SaveChangesAsync();
            return subCategory;
        }

        public async Task<SubCategory> DeleteSubCategory(SubCategory subCategory)
        {
            _context.SubCategories.Remove(subCategory);
            await _context.SaveChangesAsync();
            return subCategory;
        }

        public async Task<SubCategory> EditSubCategory(SubCategory subCategory)
        {
            _context.SubCategories.Update(subCategory);
            await _context.SaveChangesAsync();
            return subCategory;
        }

        public async Task<List<SubCategory>> GetAllSubCategories()
        {
            List<SubCategory> subCategoryList = await _context.SubCategories.ToListAsync();
            return subCategoryList;
        }

        public async Task<SubCategory> GetSubCategory(int id)
        {
            var subCategory = await _context.SubCategories.FirstOrDefaultAsync(x => x.Id == id);
            return subCategory;
        }
    }
}
