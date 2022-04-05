using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPainters.Helpers;
using WebPainters.Models;
using WebPainters.Services;
using WebPainters.Data;


namespace WebPainters.Controllers
{
    [Route("api/developers")]
    [ApiController]
    public class DevelopersController : ControllerBase
    {
        private readonly IGameDeveloperRepository _gameDeveloperRepository;

        public DevelopersController(IGameDeveloperRepository gameDeveloperRepository)
        {
            _gameDeveloperRepository = gameDeveloperRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetDevelopers()
        {
            var developersFromRepo = await _gameDeveloperRepository.GetDevelopersAsync();

            List<DeveloperDto> developersDto = new List<DeveloperDto>();

            foreach (var developer in developersFromRepo)
            {
                developersDto.Add(new DeveloperDto()
                {
                    Id = developer.Id,
                    Name = developer.Name,
                    Headquarters = developer.Headquartes,
                    FoundingDate = ((DateTime)developer.FoundingDate).ToShortDateString(),
                    NoEmployees = Convert.ToInt32(developer.NoEmployees)
                }) ;
            }

            return Ok(developersDto);
        }

        [HttpGet("{developerId}", Name = "GetDeveloper")]
        public async Task<IActionResult> GetDeveloper(int developerId)
        {
            var developerFromRepo = await _gameDeveloperRepository.GetDeveloperAsync(developerId);

            if (developerFromRepo == null)
                return NotFound();

            var developer = new DeveloperDto()
            {
                Id = developerFromRepo.Id,
                Name = developerFromRepo.Name,
                Headquarters = developerFromRepo.Headquartes,
                FoundingDate = ((DateTime)developerFromRepo.FoundingDate).ToShortDateString(),
                NoEmployees = Convert.ToInt32(developerFromRepo.NoEmployees)
            };

            return Ok(developer);
        }

        [HttpPost]
        public async Task<ActionResult> AddDeveloper(Developer developer)
        {
            _gameDeveloperRepository.AddDeveloper(developer);
            await _gameDeveloperRepository.SaveAsync();

            var developerResponse = new DeveloperDto()
            {
                Id = developer.Id,
                Name = developer.Name,
                Headquarters = developer.Headquartes,
                FoundingDate = ((DateTime)developer.FoundingDate).ToShortDateString(),
                NoEmployees = Convert.ToInt32(developer.NoEmployees)
            };

            return CreatedAtRoute("GetDeveloper",
                new { developerId = developerResponse.Id },
                developerResponse);
        }

        [HttpPut("{developerId}")]
        public async Task<ActionResult> UpdateDeveloper(int developerId, Developer developer)
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

            _gameDeveloperRepository.UpdateDeveloper(developer);
            await _gameDeveloperRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{developerId}")]
        public async Task<ActionResult> Delete(int developerId)
        {
            var developerFromRepo = await _gameDeveloperRepository.GetDeveloperAsync(developerId);

            if (developerFromRepo == null)
                return NotFound();

            _gameDeveloperRepository.DeleteDeveloper(developerFromRepo);
            await _gameDeveloperRepository.SaveAsync();

            return NoContent();
        }


    }
}
