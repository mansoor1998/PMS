using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class User : CustomEntity, IEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Username { get; set; }
        public string Contact { get; set; }
        [Required]
        public string Password { get; set; }
        public bool Gender { get; set; }
        [Required]
        public long RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Role Role { get; set; }
    }
}
