using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.Order
{
    public class GetOrderItemDto
    {
        public string MedicineName { get; set; }
        public long Quantity { get; set; }
        public string BatchCode { get; set; }
        public double PricePerUnit { get; set; }
    }
}
