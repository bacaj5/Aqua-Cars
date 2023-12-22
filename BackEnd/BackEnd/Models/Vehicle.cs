namespace AquaCars.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string KilometersPerHour { get; set; }
        public int ProdYear { get; set; }
        public double PricePerDay { get; set; }
        public string Engine { get; set; }
        public int SeatingCapacity { get; set; }
        public string Description { get; set; }

        public string PhotoFileName { get; set; }
        public string PhotoFilePath { get; set; }

        public int SubCategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
        public string SubCategoryName { get; set; }
    }
}
