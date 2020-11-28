using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.Cart
{
    public class CreateCartDto
    {
        public int Quantity { get; set; }
        public int MedicineId { get; set; }
    }
}
