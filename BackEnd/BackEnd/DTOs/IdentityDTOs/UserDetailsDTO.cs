namespace AquaCars.DTOs.IdentityDTOs
{
    public class UserDetailsDTO
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public List<string> Roles { get; set; }
    }
}
