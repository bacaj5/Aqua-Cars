using AquaCars.DTOs.CategoryDTOs;
using AquaCars.Models;
using AquaCars.Repositories.Interfaces;
using AquaCars.Responses;
using AquaCars.Services.Interfaces;
using AutoMapper;
using FluentValidation;

namespace AquaCars.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<AddCategoryDTO> _addValidator;
        private readonly IValidator<EditCategoryDTO> _editValidator;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IValidator<AddCategoryDTO> addValidator, IValidator<EditCategoryDTO> editValidator)
        {
            _addValidator = addValidator;
            _editValidator = editValidator;
            _categoryRepository = categoryRepository;             
            _mapper = mapper;
        }

        public async Task<ApiResponse> AddCategory(AddCategoryDTO dto)
        {
            var validation = _addValidator.Validate(dto);
            if(!validation.IsValid)
                return new ApiResponse(400, validation.Errors[0].ToString());

            if (dto == null)
                return new ApiResponse(400, "The Category couldn't be Added Succesfully.");

            var category = _mapper.Map<Category>(dto);
            var result = await _categoryRepository.AddCategory(category);

            if (result != null)
                return new ApiResponse(200, "The Category has been Added Succesfully.");

            return new ApiResponse(400, "The Category couldn't be Added Succesfully.");
        }

        public async Task<ApiResponse> DeleteCategory(DeleteCategoryDTO dto)
        {
            if(dto == null)
                return new ApiResponse(400, "The Category couldn't be Deleted.");

            var category = _mapper.Map<Category>(dto);
            var result = await _categoryRepository.DeleteCategory(category);

            if(result != null)
                return new ApiResponse(200, "The Category has been Deleted Succesfully.");
          
            return new ApiResponse(400, "The Category couldn't be Deleted Succesfully.");
        }

        public async Task<ApiResponse> EditCategory(EditCategoryDTO dto)
        {
            var validation = _editValidator.Validate(dto);
            if (!validation.IsValid)
                return new ApiResponse(400, validation.Errors[0].ToString());

            var category = _mapper.Map<Category>(dto);
            var result = await _categoryRepository.EditCategory(category);

            if(result != null)
                return new ApiResponse(200, "The Category has been Edited Succesfully.");

            return new ApiResponse(400, "The Category couldn't be Edited Succesfully.");
        }
        
        public async Task<List<CategoryDTO>> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllCategories();
            var categoryList = _mapper.Map<List<CategoryDTO>>(categories);
            return categoryList;
        }

        public async Task<CategoryDTO> GetCategory(int id)
        {
            var result = await _categoryRepository.GetCategory(id);
            var category = _mapper.Map<CategoryDTO>(result);
            return category;
        }
    }
}
