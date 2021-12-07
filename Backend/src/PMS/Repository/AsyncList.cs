using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Repository
{
    public class AsyncList<T>
        where T: class, IEntity
    {
        public int total { get; set; }
        public List<T> ArrayList { get; set; }
    }
}
