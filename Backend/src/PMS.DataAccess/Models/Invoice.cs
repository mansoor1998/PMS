using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class Invoice : IEntity
    {
        public long Id { get; set; }
        [Required]
        public long OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
