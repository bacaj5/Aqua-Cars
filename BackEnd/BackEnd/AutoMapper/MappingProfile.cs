using AquaCars.DTOs.CategoryDTOs;
using AquaCars.DTOs.IdentityDTOs;
using AquaCars.DTOs.ReservationDTOs;
using AquaCars.DTOs.SubCategoryDTOs;
using AquaCars.DTOs.VechileDTOs;
using AquaCars.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AquaCars.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<AddCategoryDTO, Category>().ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<EditCategoryDTO, Category>();
            CreateMap<DeleteCategoryDTO, Category>().ReverseMap();

            CreateMap<SubCategoryDTO, SubCategory>().ReverseMap();
            CreateMap<AddSubCategoryDTO, SubCategory>().ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<EditSubCategoryDTO, SubCategory>();
            CreateMap<DeleteSubCategoryDTO, SubCategory>().ReverseMap();

            CreateMap<ReservationDTO, Reservation>().ReverseMap();
            CreateMap<AddReservationDTO, Reservation>().ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<EditReservationDTO, Reservation>();
            CreateMap<DeleteReservationDTO, Reservation>().ReverseMap();

            CreateMap<VehicleDTO, Vehicle>().ReverseMap();
            CreateMap<AddVehicleDTO, Vehicle>().ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<EditVehicleDTO, Vehicle>();
            CreateMap<DeleteVehicleDTO, Vehicle>().ReverseMap();

            CreateMap<RegisterDTO, IdentityUser>().ReverseMap();
            CreateMap<EditUserDTO, IdentityUser>().ReverseMap();

        }
    }
}
