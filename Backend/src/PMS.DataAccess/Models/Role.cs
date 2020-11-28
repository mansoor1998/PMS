using System;
using System.ComponentModel.DataAnnotations;

namespace PMS.DataAccess.Models
{
    public class Role : IEntity
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
