namespace AquaCars.Responses
{
    public class JwtResponse
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public List<string> UserRoles { get; set; }

        public JwtResponse(int status, string message)
        {
            Status = status;
            Message = message;
        }
        public JwtResponse(int status, string message, string token, DateTime expiration, List<string> userRoles)
        {
            Status = status;
            Message = message;
            Token = token;
            Expiration = expiration;
            UserRoles = userRoles;
        }

    }
}