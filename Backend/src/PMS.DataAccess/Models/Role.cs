using System;
using System.ComponentModel.DataAnnotations;

namespace PMS.DataAccess.Models
{
    public class Role : CustomEntity, IEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
