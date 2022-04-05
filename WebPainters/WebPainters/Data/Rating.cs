using System;
using System.Collections.Generic;

namespace WebPainters.Data
{
    public partial class Rating
    {
        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Note { get; set; } = null!;
        public int GameId { get; set; }
        public string? Comment { get; set; }

        public virtual Game Game { get; set; } = null!;
    }
}
