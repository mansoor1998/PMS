using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class Order : IEntity
    {
        public long Id { get; set; }
        [Required]
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [DefaultValue(0)]
        public bool finalized { get; set; }
        public string CustomerName { get; set; }
        public string MobileNo { get; set; }
        public List<Cart> Carts { get; set; } = new List<Cart>();
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public DateTime FinalizedDate { get; set; }
    }
}
