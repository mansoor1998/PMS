using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.Invoice
{
    public class CreateInvoiceDto
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public string InvoiceNo { get; set; }
    }
}
