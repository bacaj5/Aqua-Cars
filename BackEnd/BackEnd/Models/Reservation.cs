using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace AquaCars.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string EMail { get; set; }
        public string PhoneNumber { get; set; }
        public int NumberOfDays { get; set; }
        public string PickUpLocation { get; set; }
        public DateTime PickUpDate { get; set; }
        public DateTime PayDate { get; set; } = DateTime.Now;
        public double TotalPay { get; set; }
        public string? LeaveAMessage { get; set; }

        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

    }
}
