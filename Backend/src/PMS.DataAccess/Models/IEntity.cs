using System;
using System.Collections.Generic;
using System.Text;

namespace PMS.DataAccess.Models
{
    public interface IEntity
    {
        long Id {get; set;}
        DateTime Created { get; set; }
        DateTime Updated { get; set; }
    }
}
