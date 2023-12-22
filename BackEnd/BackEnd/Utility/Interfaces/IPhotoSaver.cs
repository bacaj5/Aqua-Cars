namespace AquaCars.Utility.Interfaces
{
    public interface IPhotoSaver
    {
        Task<string> SavePhoto(IFormFile photoFile);
    }
}
