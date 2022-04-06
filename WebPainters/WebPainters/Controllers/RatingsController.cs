using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebPainters.Data;
using WebPainters.Services;
using WebPainters.Models;

namespace WebPainters.Controllers
{
    [Route("api/ratings")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly IGameDeveloperRepository _gameDeveloperRepository;

        public RatingsController(IGameDeveloperRepository gameDeveloperRepository)
        {
            _gameDeveloperRepository = gameDeveloperRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddRating(RatingDto ratingDto)
        {
            Rating rating = new Rating()
            {
                Comment = ratingDto.Comment,
                GameId = ratingDto.GameId,
                Note = ratingDto.Note,
                UserName = ratingDto.UserName
            };

            _gameDeveloperRepository.AddRating(rating);         
            bool res = await _gameDeveloperRepository.SaveAsync();
                    
            return CreatedAtAction(nameof(GetRatingsByGame), new { gameId = rating.GameId }, rating);          
        }

        [HttpGet ("{gameId}", Name = "getRatingsByGame")]
        public async Task<IActionResult> GetRatingsByGame(int gameId)
        {
            Console.WriteLine(gameId);
            if (!await _gameDeveloperRepository.GameExistsAsync(gameId))
            {
                ErrResponse errResponse = new ErrResponse()
                {
                    HttpCode = 404,
                    Error = "Game doesn't exists"
                };
                return NotFound(errResponse);
            }

            var ratingsFromRepo = await _gameDeveloperRepository.GetRatingsAsync(gameId);
            
            return Ok(ratingsFromRepo);
        }
    }
}
