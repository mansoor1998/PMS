using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Repository.MedicalCompanyRepo
{
    public class MedicalCompanyRepository
        : EfCoreRepository<MedicalCompany, PMSContext>, IMedicalCompanyRepository
    {
        public MedicalCompanyRepository(PMSContext context) : base(context)
        {
        }
    }
}
