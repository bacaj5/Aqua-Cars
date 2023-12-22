namespace AquaCars.DTOs.VechileDTOs
{
	public class AddVehicleDTO
	{
        public string Model { get; set; }
        public int SubCategoryId { get; set; }
        public string KilometersPerHour { get; set; }
        public int ProdYear { get; set; }
        public string Engine { get; set; }
        public int SeatingCapacity { get; set; }
        public string Description { get; set; }
        public double PricePerDay { get; set; }
        public IFormFile Photo { get; set; }
    }
}
