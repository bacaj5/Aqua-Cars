using AquaCars.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AquaCars.Data.DataSeed
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasData(
                new Category
                {
                    Id = 1,
                    Name = "Audi",
                },

                new Category
                {
                    Id = 2,
                    Name = "Mercedes",
                },

                new Category
                {
                    Id = 3,
                    Name = "BMW",
                },

                new Category
                {
                    Id = 4,
                    Name = "Lamborghini",
                },

                new Category
                {
                    Id = 5,
                    Name = "Ferrari",
                },

                new Category
                {
                    Id = 6,
                    Name = "Tesla",
                },

                new Category
                {
                    Id = 7,
                    Name = "Kia",
                },

                new Category
                {
                    Id = 8,
                    Name = "Chevrolet",
                },

                new Category
                {
                    Id = 9,
                    Name = "Citroen",
                },

                new Category
                {
                    Id = 10,
                    Name = "Fiat",
                }
            );
        }
    }
}