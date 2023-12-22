using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AquaCars.Utility.StaticData;

namespace SportsManagementSystem.Infrastructure.Data.DataSeed
{
    public class IdentityRoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole { Id = "adminRoleId1293931239438254523", Name = UserRoles.Admin, NormalizedName = UserRoles.Admin.ToUpper() },
                new IdentityRole { Id = "userRoleId23094852091092347944", Name = UserRoles.User, NormalizedName = UserRoles.User.ToUpper() }
            );
        }
    }
}
