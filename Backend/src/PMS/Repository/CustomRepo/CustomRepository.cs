using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Repository.CustomRepo
{
    public class CustomRepository<M> : EfCoreRepository<M, PMSContext>, IRepository<M>
        where M : class, IEntity
    {
        public CustomRepository(PMSContext context) : base(context)
        {
        }
    }
}
