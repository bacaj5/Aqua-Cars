using AquaCars.Utility.Interfaces;

namespace AquaCars.Utility
{
    public class PhotoSaver : IPhotoSaver
    {
        public PhotoSaver() { }

        public async Task<string> SavePhoto(IFormFile photoFile)
        {
            if (photoFile == null || photoFile.Length == 0)
                throw new ArgumentException("Invalid photo file.");

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(photoFile.FileName);
            string filePath = Path.Combine("../../FrontEnd/public/vehiclePhotos/", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photoFile.CopyToAsync(stream);
            }
            return "/vehiclePhotos/" + fileName;
        }
    }
}