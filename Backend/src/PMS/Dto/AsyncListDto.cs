using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto
{
    public class AsyncListDto<T>
        where T: class
    {
        public int total { get; set; }
        public List<T> ArrayList { get; set; }
    }
}
