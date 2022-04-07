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

        //get individual rating by id
        [HttpGet("{gameId}/{ratingId}")]
        public async Task<IActionResult> GetRatingByGame(int gameId, int ratingId)
        {
            if (!await _gameDeveloperRepository.RatingExistsAsync(ratingId))
            {
                ErrResponse errResponse = new ErrResponse()
                {
                    HttpCode = 404,
                    Error = "Rating doesn't exist"
                };
                return NotFound(errResponse);
            }

            var ratingsFromRepo = await _gameDeveloperRepository.GetRatingAsync(gameId, ratingId);

            if (ratingsFromRepo == null)
            {
                ErrResponse errResponse = new ErrResponse()
                {
                    HttpCode = 404,
                    Error = $"GameID {gameId} doesn't exist for Rating ID {ratingId}"
                };
                return NotFound(errResponse);
            }

            return Ok(ratingsFromRepo);
        }

        //delete rating
        [HttpDelete("{gameId}/{ratingId}")]
        public async Task<ActionResult> DeleteRating(int gameId, int ratingId)
        {
            var ratingsFromRepo = await _gameDeveloperRepository.GetRatingAsync(gameId, ratingId);

            if (ratingsFromRepo == null)
                return NotFound();

            _gameDeveloperRepository.DeleteRating(ratingsFromRepo);
            await _gameDeveloperRepository.SaveAsync();

            return NoContent();
        }
    }
}
