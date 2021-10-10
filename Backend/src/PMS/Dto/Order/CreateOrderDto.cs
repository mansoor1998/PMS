using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.Order
{
    public class CreateOrderDto
    {
        public bool finalized { get; set; }
        public string CustomerName { get; set; }
        public string MobileNo { get; set; }
    }
}
