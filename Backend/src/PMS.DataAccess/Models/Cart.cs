using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class Cart : IEntity
    {
        public long Id { get; set; }
        [Required]
        public double Quantity { get; set; }
        // fluent API required
        [Required]
        public long OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        // fluent API required.
        [Required]
        public long MedicineId { get; set; }
        [ForeignKey("MedicineId")]
        public Medicine Medicine { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
