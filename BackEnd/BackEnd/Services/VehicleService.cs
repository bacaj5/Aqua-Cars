using AquaCars.DTOs.VechileDTOs;
using AquaCars.Models;
using AquaCars.Repositories.Interfaces;
using AquaCars.Responses;
using AquaCars.Services.Interfaces;
using AquaCars.Utility.Interfaces;
using AutoMapper;
using FluentValidation;

namespace AquaCars.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly ISubCategoryRepository _subCategoryRepository;
        private readonly IPhotoSaver _photoSaver;
        private readonly IMapper _mapper;
        private readonly IValidator<AddVehicleDTO> _addValidator;
        private readonly IValidator<EditVehicleDTO> _editValidator;
        public VehicleService(IVehicleRepository vehicleRepository, ISubCategoryRepository subCategoryRepository, IValidator<AddVehicleDTO> addValidator, IMapper mapper, IValidator<EditVehicleDTO> editValidator, IPhotoSaver photoSaver)
        {
            _vehicleRepository = vehicleRepository;
            _subCategoryRepository = subCategoryRepository;
            _photoSaver = photoSaver;
            _mapper = mapper;
            _addValidator = addValidator;
            _editValidator = editValidator;
        }

        public async Task<ApiResponse> AddVehicle(AddVehicleDTO dto)
        {
            var validation = _addValidator.Validate(dto);
            if (!validation.IsValid)
                return new ApiResponse(400, validation.Errors[0].ToString());

            if (dto.Photo == null || dto.Photo.Length == 0)
                return new ApiResponse(400, "No Photo Provided.");

            var vehicle = _mapper.Map<Vehicle>(dto);

            string photoFilePath = await _photoSaver.SavePhoto(dto.Photo);
            vehicle.PhotoFileName = Path.GetFileName(photoFilePath);
            vehicle.PhotoFilePath = photoFilePath;

            var subCategory = await _subCategoryRepository.GetSubCategory(dto.SubCategoryId);
            vehicle.SubCategoryName = subCategory.Name;

            var result = await _vehicleRepository.AddVehicle(vehicle);
            if (result != null) 
                return new ApiResponse(200, "The Vehicle has been Added Succesfully.");

            return new ApiResponse(400, "The Vehicle could't be Added Succesfully");
        }

        public async Task<ApiResponse> DeleteVehicle(DeleteVehicleDTO dto)
        {
            if (dto == null)
                return new ApiResponse(400, "The Vehicle could't be Deleted Succesfully.");

            var vehicle = await _vehicleRepository.GetVehicle(dto.Id);
            var result = await _vehicleRepository.DeleteVehicle(vehicle);

            string photoFilePath = "../../FrontEnd/public" + vehicle.PhotoFilePath;
            if (!string.IsNullOrEmpty(vehicle.PhotoFilePath) && File.Exists(photoFilePath))
                File.Delete(photoFilePath);

            if (result != null)
                return new ApiResponse(200, "The Vehicle has been Deleted Succesfully.");

            return new ApiResponse(400, "The Vehicle couldn't be Deleted Succesfully.");
        }

        public async Task<ApiResponse> EditVehicle(EditVehicleDTO dto)
        {
            var validation = _editValidator.Validate(dto);
            if (!validation.IsValid)
                return new ApiResponse(400, validation.Errors[0].ToString());

            var vehicle = await _vehicleRepository.GetVehicle(dto.Id);
            if (vehicle != null)
            {
                vehicle.Model = vehicle.Model;
                vehicle.KilometersPerHour = vehicle.KilometersPerHour;
                vehicle.ProdYear = vehicle.ProdYear;
                vehicle.Engine = vehicle.Engine;
                vehicle.SeatingCapacity = vehicle.SeatingCapacity;
                vehicle.Description = vehicle.Description;
                vehicle.PricePerDay = vehicle.PricePerDay;
                vehicle.SubCategoryId = vehicle.SubCategoryId;

                var subCategory = await _subCategoryRepository.GetSubCategory(dto.SubCategoryId);
                vehicle.SubCategoryName = subCategory.Name;

                string oldPhotoFilePath = "../../FrontEnd/public" + vehicle.PhotoFilePath;
                string photoFilePath = await _photoSaver.SavePhoto(dto.Photo);
                vehicle.PhotoFileName = Path.GetFileName(photoFilePath);
                vehicle.PhotoFilePath = photoFilePath;

                if (!string.IsNullOrEmpty(vehicle.PhotoFilePath) && File.Exists(oldPhotoFilePath))
                    File.Delete(oldPhotoFilePath);
            }

            var result = await _vehicleRepository.EditVehicle(vehicle);
            if (result != null)
                return new ApiResponse(200, "The Vehicle has been Edited Succesfully.");

            return new ApiResponse(400, "The Vehicle couldn't be Edited Succesfully.");
        }

        public async Task<List<VehicleDTO>> GetAllVehicles()
        {
            var vehicles = await _vehicleRepository.GetAllVehicles();
            var vehiclesListDTO = _mapper.Map<List<VehicleDTO>>(vehicles);
            return vehiclesListDTO;
        }

        public async Task<VehicleDTO> GetVehicle(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicle(id);
            var vehicleDTO = _mapper.Map<VehicleDTO>(vehicle);
            return vehicleDTO;
        }
    }
}
