using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Repository.MedicineRepo
{
    public class MedicineRepository : EfCoreRepository<Medicine, PMSContext>, IMedicineRepository
    {
        public MedicineRepository(PMSContext context) : base(context)
        {
        }
    }
}
