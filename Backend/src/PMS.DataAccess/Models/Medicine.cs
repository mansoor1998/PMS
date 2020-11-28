using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class Medicine : IEntity
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string BatchCode { get; set; }
        public DateTime MGFDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public double Quantity { get; set; }
        public double PricePerUnit { get; set; }
        public long? MedicalCompanyId { get; set; }
        [ForeignKey("MedicalCompanyId")]
        public MedicalCompany MedicalCompany { get; set; }
        [Required]
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User user { get; set; }
        public List<Cart> Carts { get; set; } = new List<Cart>();
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
