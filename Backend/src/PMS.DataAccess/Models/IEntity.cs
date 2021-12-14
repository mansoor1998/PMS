using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PMS.DataAccess.Models
{
    public interface IEntity
    {
        long Id { get; set; }
        DateTime Created { get; set; }
        DateTime Updated { get; set; }
        bool IsDeleted { get; set; }
    }
}
