using AquaCars.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace AquaCars.Data.DataSeed
{
    public class SubCategoryConfiguration : IEntityTypeConfiguration<SubCategory>
    {
        public void Configure(EntityTypeBuilder<SubCategory> builder)
        {
            builder.HasData(
                new SubCategory
                {
                    Id = 1,
                    Name = "A4",
                    CategoryId = 1,
                },

                new SubCategory
                {
                    Id = 2,
                    Name = "Z5 f-11",
                    CategoryId = 4,
                },

                new SubCategory
                {
                    Id = 3,
                    Name = "G4",
                    CategoryId = 3,
                },

                new SubCategory
                {
                    Id = 4,
                    Name = "Y7 G8",
                    CategoryId = 8,
                },

                new SubCategory
                {
                    Id = 5,
                    Name = "O990-W",
                    CategoryId = 10,
                },

                new SubCategory
                {
                    Id = 6,
                    Name = "H22",
                    CategoryId = 2,
                },

                new SubCategory
                {
                    Id = 7,
                    Name = "55 F11-223",
                    CategoryId = 5,
                },

                new SubCategory
                {
                    Id = 8,
                    Name = "AA FS",
                    CategoryId = 7,
                },

                new SubCategory
                {
                    Id = 9,
                    Name = "Crossover",
                    CategoryId = 6,
                },

                new SubCategory
                {
                    Id = 10,
                    Name = "SUV",
                    CategoryId = 9,
                }
            );
        }
    }
}