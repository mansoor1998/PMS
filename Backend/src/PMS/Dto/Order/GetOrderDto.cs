using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.Order
{
    public class GetOrderDto
    {
        public string CustomerName { get; set; }
        public string OrderNumber { get; set; }
        public string OrderStatus { get; set; }
        public List<GetOrderItemDto> OrderItems { get; set; }
    }
}
