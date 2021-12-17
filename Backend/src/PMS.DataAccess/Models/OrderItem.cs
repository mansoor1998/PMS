using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class OrderItem : CustomEntity, IEntity
    {
        public string MedicineName { get; set; }
        public long Quantity { get; set; }
        public string BatchCode { get; set; }
        public double PricePerUnit { get; set; }

        [ForeignKey("OrderId")]
        public Order Order { get; set; }
    }
}
