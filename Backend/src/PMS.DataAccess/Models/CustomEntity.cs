using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace PMS.DataAccess.Models
{
    public class CustomEntity : IEntity
    {
        public long Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
