using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace AquaCars.Data.DataSeed
{
    public class IdentityUserConfiguration : IEntityTypeConfiguration<IdentityUser>
    {
        public void Configure(EntityTypeBuilder<IdentityUser> builder)
        {
            var hasher = new PasswordHasher<IdentityUser>();

            builder.HasData(new IdentityUser
            {
                Id = "adminuser123412903847192311234",
                UserName = "KajtazBacaj",
                Email = "kbacaj5@gmail.com",
                NormalizedEmail = "KBACAJ5@GMAIL.COM",
                PasswordHash = hasher.HashPassword(null, "kajtazbacaj"),
                SecurityStamp = Guid.NewGuid().ToString(),
            });
        }
    }
}
