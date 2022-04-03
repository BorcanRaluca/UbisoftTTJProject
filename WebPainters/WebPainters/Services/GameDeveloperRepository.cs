using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebPainters.Data;

namespace WebPainters.Services
{
    public class GameDeveloperRepository : IGameDeveloperRepository
    {
        private readonly UbisoftTTJContext _context;

        public GameDeveloperRepository(UbisoftTTJContext ttjContext)
        {
            _context = ttjContext;
        }

        public void AddDeveloper(Developer developer)
        {
            if (developer == null)
            {
                throw new ArgumentNullException(nameof(developer));
            }

            _context.Developers.Add(developer);
        }

        public async Task<bool> DeveloperExistsAsync(int developerId)
        {
            return await _context.Developers.AnyAsync(a => a.Id == developerId);
        }

        public void DeleteDeveloper(Developer developer)
        {
            if (developer == null)
            {
                throw new ArgumentNullException(nameof(developer));
            }

            _context.Developers.Remove(developer);
        }

        public async Task<Developer> GetDeveloperAsync(int developerId)
        {
            return await _context.Developers.FirstOrDefaultAsync(a => a.Id == developerId);
        }

        public async Task<IEnumerable<Developer>> GetDevelopersAsync()
        {
            return await _context.Developers.ToListAsync<Developer>();
        }

        public void UpdateDeveloper(Developer developer)
        {
            _context.Developers.Update(developer);
        }

        public void AddGame(int developerId, Game game)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(Game));
            }
            // always set the DeveloperId to the passed-in developerId
            game.DeveloperId = developerId;
            _context.Games.Add(game);
        }

        public void DeleteGame(Game game)
        {
            _context.Games.Remove(game);
        }

        public async Task<Game> GetGameAsync(int developerId, int gameId)
        {
            return await _context.Games
                .Where(c => c.DeveloperId == developerId && c.Id == gameId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Game>> GetGamesAsync(int developerId)
        {
            return await _context.Games
                .Where(c => c.DeveloperId == developerId)
                .OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}
