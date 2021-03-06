using WebPainters.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebPainters.Services
{
    public interface IGameDeveloperRepository
    {
        //developer
        void AddDeveloper(Developer developer);
        Task<bool> DeveloperExistsAsync(int developerID);
        void DeleteDeveloper(Developer developer);
        Task<Developer> GetDeveloperAsync(int developerId);
        Task<IEnumerable<Developer>> GetDevelopersAsync();
        void UpdateDeveloper(Developer developer);

        //game section
        void AddGame(int developerId, Game game);
        void DeleteGame(Game game);
        Task<Game> GetGameAsync(int developerId, int gameId);
        Task<IEnumerable<Game>> GetGamesAsync(int developerId);

        //rating
        void AddRating(Rating rating);
        Task<bool> GameExistsAsync(int gameId);
        Task<bool> RatingExistsAsync(int ratingId);
        Task<IEnumerable<Rating>> GetRatingsAsync(int gameId);
        void DeleteRating(Rating rating);
        Task<Rating> GetRatingAsync(int gameId, int ratingId);

        Task<bool> SaveAsync();
    }
}
