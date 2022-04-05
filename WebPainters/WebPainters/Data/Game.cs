using System;
using System.Collections.Generic;

namespace WebPainters.Data
{
    public partial class Game
    {
        public Game()
        {
            Ratings = new HashSet<Rating>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime? ReleaseDate { get; set; }
        public string? Type { get; set; }
        public decimal? Price { get; set; }
        public int DeveloperId { get; set; }

        public virtual Developer Developer { get; set; } = null!;
        public virtual ICollection<Rating> Ratings { get; set; }
    }
}
