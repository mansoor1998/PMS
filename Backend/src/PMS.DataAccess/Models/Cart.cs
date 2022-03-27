using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class Cart : CustomEntity, IEntity
    {
        [Required]
        public long Quantity { get; set; }
        // fluent API required
        //[ForeignKey("OrderId")]
        //public Order Order { get; set; }
        // fluent API required.
        [Required]
        public long MedicineId { get; set; }
        [ForeignKey("MedicineId")]
        public Medicine Medicine { get; set; }

        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
