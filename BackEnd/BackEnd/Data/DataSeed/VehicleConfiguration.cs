using AquaCars.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace AquaCars.Data.DataSeed
{
    public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.HasData(
                new Vehicle
                {
                    Id = 1,
                    Model = "Mercedes",
                    KilometersPerHour = "220",
                    ProdYear = 2022,
                    PricePerDay = 24.5,
                    Engine = "Auto GTI",
                    SeatingCapacity = 5,
                    Description = "Kjo makinë është një makinë hibride pioniere që është bërë sinonim i efikasitetit të karburantit dhe eko-miqësisë. Me dizajnin e tij dallues aerodinamik, Prius krenohet me ekonominë mbresëlënëse të karburantit, duke e bërë atë një zgjedhje të ndërgjegjshme për mjedisin. Teknologjia hibride kombinon pa probleme një motor benzine me një motor elektrik, duke ofruar një përvojë të qetë dhe efikase të drejtimit, së bashku me një brendshme praktike dhe komode.",
                    PhotoFilePath = "/vehiclePhotos/mercedes-offer.png",
                    PhotoFileName = "mercedes-offer.png",
                    SubCategoryId = 4,
                    SubCategoryName = "Y7 G8"
                },

                new Vehicle
                {
                    Id = 2,
                    Model = "Nissan",
                    KilometersPerHour = "280",
                    ProdYear = 2023,
                    PricePerDay = 32.5,
                    Engine = "Auto GTI+",
                    SeatingCapacity = 5,
                    Description = "Kjo makinë është një makinë hibride pioniere që është bërë sinonim i efikasitetit të karburantit dhe eko-miqësisë. Me dizajnin e tij dallues aerodinamik, Prius krenohet me ekonominë mbresëlënëse të karburantit, duke e bërë atë një zgjedhje të ndërgjegjshme për mjedisin. Teknologjia hibride kombinon pa probleme një motor benzine me një motor elektrik, duke ofruar një përvojë të qetë dhe efikase të drejtimit, së bashku me një brendshme praktike dhe komode.",
                    PhotoFilePath = "/vehiclePhotos/nissan-offer.png",
                    PhotoFileName = "nissan-offer.png",
                    SubCategoryId = 5,
                    SubCategoryName = "O990-W"
                },

                new Vehicle
                {
                    Id = 3,
                    Model = "Toyota",
                    KilometersPerHour = "210",
                    ProdYear = 2002,
                    PricePerDay = 10,
                    Engine = "F-Model",
                    SeatingCapacity = 5,
                    Description = "Makina Toyota F-Model është një makinë kompakte elegante dhe praktike që shquhet për efikasitetin e karburantit dhe shkathtësinë. Me dizajnin e saj sportiv dhe menaxhimin e shkathët, Civic Hatchback është një opsion argëtues për të vozitur për udhëtarët urban. Brenda, ai ofron një kabinë të dizajnuar mirë me karakteristika të teknologjisë moderne, duke e bërë atë një zgjedhje tërheqëse për ata që kërkojnë një përzierje të efikasitetit dhe komoditeteve moderne.",
                    PhotoFilePath = "/vehiclePhotos/offer-toyota.png",
                    PhotoFileName = "offer-toyota.png",
                    SubCategoryId = 8,
                    SubCategoryName = "AA FS"
                },

                new Vehicle
                {
                    Id = 4,
                    Model = "Toyota",
                    KilometersPerHour = "290",
                    ProdYear = 2017,
                    PricePerDay = 24.5,
                    Engine = "DD331",
                    SeatingCapacity = 2,
                    Description = "Makina Toyota DD331 është një makinë kompakte elegante dhe praktike që shquhet për efikasitetin e karburantit dhe shkathtësinë. Me dizajnin e saj sportiv dhe menaxhimin e shkathët, Civic Hatchback është një opsion argëtues për të vozitur për udhëtarët urban. Brenda, ai ofron një kabinë të dizajnuar mirë me karakteristika të teknologjisë moderne, duke e bërë atë një zgjedhje tërheqëse për ata që kërkojnë një përzierje të efikasitetit dhe komoditeteve moderne.",
                    PhotoFilePath = "/vehiclePhotos/toyota-offer-2.png",
                    PhotoFileName = "toyota-offer-2.png",
                    SubCategoryId = 9,
                    SubCategoryName = "Crossover"
                }
                
            );
        }
    }   
}
