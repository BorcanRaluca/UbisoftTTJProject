using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPainters.Models
{
    public class DeveloperDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime FoundingDate { get; set; }
        public string Headquarters { get; set; }
        public int NoEmployees { get; set; }
    }
}
