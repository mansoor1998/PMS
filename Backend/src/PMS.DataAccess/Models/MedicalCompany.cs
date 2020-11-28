using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class MedicalCompany : IEntity
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User user { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
