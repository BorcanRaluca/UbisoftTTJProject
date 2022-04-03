using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPainters.Helpers
{
    public class DateHelpers
    {
        public static int GetCurrentAge(DateTime dateTimeOffset)
        {
            var currentDate = DateTime.UtcNow;
            int age = currentDate.Year - dateTimeOffset.Year;

            if (currentDate < dateTimeOffset.AddYears(age))
            {
                age--;
            }

            return age;
        }
    }
}
