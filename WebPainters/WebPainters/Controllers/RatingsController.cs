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
        public async Task<ActionResult> AddRating(int gameId,Rating rating)
        {
            _gameDeveloperRepository.AddRating(gameId, rating);
            await _gameDeveloperRepository.SaveAsync();

            var ratingResponse = new RatingDto()
            {
                Id = rating.Id,
                UserName = rating.UserName,
                Note = rating.Note,
                GameId = rating.GameId,
                Comment = rating.Comment
            };

            return CreatedAtRoute("GetRating",
                new { ratingId = ratingResponse.Id },
                ratingResponse);
        }

        [HttpGet ("{gameId}", Name = "GetRatings")]
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
