using AquaCars.DTOs.CategoryDTOs;
using AquaCars.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AquaCars.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize("Admin")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var result = await _categoryService.GetAllCategories();
            return Ok(result);
        }
    
        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetCategoryById(int categoryId)
        {
            var result = await _categoryService.GetCategory(categoryId);
            return Ok(result);
        }
    
        [HttpPost]
        public async Task<IActionResult> AddCategory(AddCategoryDTO dto)
        {
            var result = await _categoryService.AddCategory(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpPut]
        public async Task<IActionResult> EditCategory(EditCategoryDTO dto)
        {
            var result = await _categoryService.EditCategory(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(DeleteCategoryDTO dto)
        {
            var result = await _categoryService.DeleteCategory(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

    }
}
