using AquaCars.DTOs.SubCategoryDTOs;
using AquaCars.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AquaCars.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize("Admin")]
    public class SubCategoryController : Controller
    {
        private readonly ISubCategoryService _subCategoryService;
        public SubCategoryController(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubCategories()
        {
            var result = await _subCategoryService.GetAllSubCategories();
            return Ok(result);
        }

        [HttpGet("{subCategoryId}")]
        public async Task<IActionResult> GetSubCategoryById(int subCategoryId)
        {
            var result = await _subCategoryService.GetSubCategory(subCategoryId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddSubCategory(AddSubCategoryDTO dto)
        {
            var result = await _subCategoryService.AddSubCategory(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpPut]
        public async Task<IActionResult> EditSubCategory(EditSubCategoryDTO dto)
        {
            var result = await _subCategoryService.EditSubCategory(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteSubCategory(DeleteSubCategoryDTO dto)
        {
            var result = await _subCategoryService.DeleteSubCategory(dto);
            return result.Status == 200 ? Ok(result) : BadRequest(result);
        }
    }
}
