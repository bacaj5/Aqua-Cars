using AquaCars.DTOs.SubCategoryDTOs;
using AquaCars.Models;
using AquaCars.Repositories.Interfaces;
using AquaCars.Responses;
using AquaCars.Services.Interfaces;
using AutoMapper;
using FluentValidation;

namespace AquaCars.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly ISubCategoryRepository _subCategoryRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<AddSubCategoryDTO> _addValidator;
        private readonly IValidator<EditSubCategoryDTO> _editValidator;

        public SubCategoryService(ISubCategoryRepository subCategoryRepository, IMapper mapper, IValidator<AddSubCategoryDTO> addValidator, IValidator<EditSubCategoryDTO> editValidator)
        {
            _addValidator = addValidator;
            _editValidator = editValidator;
            _subCategoryRepository = subCategoryRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse> AddSubCategory(AddSubCategoryDTO dto)
        {
            var validation = _addValidator.Validate(dto);
            if (!validation.IsValid)
                return new ApiResponse(400, validation.Errors[0].ToString());

            if (dto == null)
                return new ApiResponse(400, "The SubCategory couldn't be Added Succesfully.");

            var subCategory = _mapper.Map<SubCategory>(dto);
            var result = await _subCategoryRepository.AddSubCategory(subCategory);

            if (result != null)
                return new ApiResponse(200, "The SubCategory has been Added Succesfully.");

            return new ApiResponse(400, "The SubCategory couldn't be Added Succesfully.");
        }

        public async Task<ApiResponse> DeleteSubCategory(DeleteSubCategoryDTO dto)
        {
            if (dto == null)
                return new ApiResponse(400, "The SubCategory couldn't be Deleted.");

            var subCategory = _mapper.Map<SubCategory>(dto);
            var result = await _subCategoryRepository.DeleteSubCategory(subCategory);

            if (result != null)
                return new ApiResponse(200, "The SubCategory has been Deleted Succesfully.");

            return new ApiResponse(400, "The SubCategory couldn't be Deleted Succesfully.");
        }

        public async Task<ApiResponse> EditSubCategory(EditSubCategoryDTO dto)
        {
            var validation = _editValidator.Validate(dto);
            if (!validation.IsValid)
                return new ApiResponse(400, validation.Errors[0].ToString());

            var subCategory = _mapper.Map<SubCategory>(dto);
            var result = await _subCategoryRepository.EditSubCategory(subCategory);

            if (result != null)
                return new ApiResponse(200, "The SubCategory has been Edited Succesfully.");

            return new ApiResponse(400, "The SubCategory couldn't be Edited Succesfully.");
        }

        public async Task<List<SubCategoryDTO>> GetAllSubCategories()
        {
            var categories = await _subCategoryRepository.GetAllSubCategories();
            var subCategoryList = _mapper.Map<List<SubCategoryDTO>>(categories);
            return subCategoryList;
        }

        public async Task<SubCategoryDTO> GetSubCategory(int id)
        {
            var result = await _subCategoryRepository.GetSubCategory(id);
            var subCategory = _mapper.Map<SubCategoryDTO>(result);
            return subCategory;
        }
    }
}
