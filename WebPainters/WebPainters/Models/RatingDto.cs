using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPainters.Models
{
    public class RatingDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Note { get; set; }
        public int GameId { get; set; }
        public string? Comment { get; set; }
     
    }
}
