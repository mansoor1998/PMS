using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class MedicalCompany : CustomEntity, IEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User user { get; set; }
    }
}
