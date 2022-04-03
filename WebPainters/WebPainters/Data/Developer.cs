using System;
using System.Collections.Generic;

namespace WebPainters.Data
{
    public partial class Developer
    {
        public Developer()
        {
            Games = new HashSet<Game>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime? FoundingDate { get; set; }
        public string? Headquartes { get; set; }
        public int? NoEmployees { get; set; }

        public virtual ICollection<Game> Games { get; set; }
    }
}
