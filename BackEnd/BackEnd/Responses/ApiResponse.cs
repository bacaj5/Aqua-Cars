namespace AquaCars.Responses
{
    public class ApiResponse
    {
        public int Status { get; set; }
        public string Message { get; set; }

        public ApiResponse(int status, string message)
        {
            Status = status;
            Message = message;
        }

    }
}