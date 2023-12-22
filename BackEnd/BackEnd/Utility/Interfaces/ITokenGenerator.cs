using Microsoft.AspNetCore.Identity;

namespace AquaCars.Utility.Interfaces
{
    public interface ITokenGenerator
    {
        string GenerateJwtToken(IdentityUser user, List<string> roles);
    }
}
