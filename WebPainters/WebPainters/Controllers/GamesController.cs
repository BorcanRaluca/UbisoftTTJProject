using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPainters.Services;

namespace WebPainters.Controllers
{
    [Route("api/developers/{developerId}/games")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IGameDeveloperRepository _gameDeveloperRepository;

        public GamesController(IGameDeveloperRepository gameDeveloperRepository)
        {
            _gameDeveloperRepository = gameDeveloperRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetGamesByDeveloper(int developerId)
        {
            if (!await _gameDeveloperRepository.DeveloperExistsAsync(developerId))
            {
                ErrResponse errResponse = new ErrResponse()
                {
                    HttpCode = 404,
                    Error = "Developer doesn't exists"
                };
                return NotFound(errResponse);
            }

            var gamesFromRepo = await _gameDeveloperRepository.GetGamesAsync(developerId);

            return Ok(gamesFromRepo);
        }

        [HttpGet("{gameId}")]
        public async Task<IActionResult> GetGameByDeveloper(int developerId, int gameId)
        {
            if (!await _gameDeveloperRepository.DeveloperExistsAsync(developerId))
            {
                ErrResponse errResponse = new ErrResponse()
                {
                    HttpCode = 404,
                    Error = "Developer doesn't exists"
                };
                return NotFound(errResponse);
            }

            var gamesFromRepo = await _gameDeveloperRepository.GetGameAsync(developerId, gameId);

            if (gamesFromRepo == null)
            {
                ErrResponse errResponse = new ErrResponse()
                {
                    HttpCode = 404,
                    Error = $"GameID {gameId} doesn't exists for Developer ID {developerId}"
                };
                return NotFound(errResponse);
            }

            return Ok(gamesFromRepo);
        }
    }



    public class ErrResponse
    {
        public int HttpCode { get; set; }
        public string Error { get; set; }
    }
}
