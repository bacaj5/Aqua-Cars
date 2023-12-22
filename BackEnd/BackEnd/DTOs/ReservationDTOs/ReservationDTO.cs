using AquaCars.Models;
using System.Text.Json.Serialization;

namespace AquaCars.DTOs.ReservationDTOs
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string EMail { get; set; }
        public string PhoneNumber { get; set; }
        public int NumberOfDays { get; set; }
        public string PickUpLocation { get; set; }
        public DateTime PickUpDate { get; set; }
        public DateTime PayDate { get; set; }
        public double TotalPay { get; set; }
        public int VehicleId { get; set; }
        public string? LeaveAMessage { get; set; }

    }
}