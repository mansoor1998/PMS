using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


// SHIPPED.
// OPEEND.


namespace PMS.DataAccess.Models
{
    public class Order : CustomEntity, IEntity
    {
        [Required]
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [DefaultValue(0)]
        public string CustomerName { get; set; }
        //public List<Cart> Carts { get; set; } = new List<Cart>();
        //public long Quantity { get; set; }
        //public string MedicineName { get; set; }
        //public string BatchCode { get; set; }
        public string OrderNumber { get; set; }
        public string OrderStatus { get; set; }
    }
}
