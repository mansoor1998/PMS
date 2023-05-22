using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.DataAccess.Models;
using PMS.Dto.Medicine;
using PMS.Repository;

namespace PMS.Controllers
{
    [Route("api/db")]
    [ApiController]
    public class MyController : GetCrudAppController<Medicine, GetMedicineDto>//AsyncCrudAppController<Medicine, GetMedicineDto, CreateMedicineDto>
    {
        public MyController(IRepository<Medicine> repository) : base(repository)
        {}

    }

}
