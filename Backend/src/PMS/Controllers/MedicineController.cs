using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PMS.DataAccess.Models;
using PMS.Dto.Medicine;
using PMS.Repository.MedicineRepo;

namespace PMS.Controllers
{
    //[Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        IMedicineRepository _repository;
        public MedicineController(IMedicineRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public void CreateMedicine(CreateMedicineDto medicineDto)
        {
            var entity = new Medicine();
            Utility.Copier<CreateMedicineDto, Medicine>.Copy(medicineDto, entity);
            entity.UserId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            _repository.Create(entity);
        }

        [HttpGet("all")]
        public List<CreateMedicineDto> GetAllMedicines()
        {
            var medicines = _repository.GetAll();
            List<CreateMedicineDto> medicinesDto = new List<CreateMedicineDto>();
            for (int i = 0; i < medicines.Count; i++)
            {
                CreateMedicineDto medicineRef = new CreateMedicineDto();
                medicinesDto.Add(medicineRef);
                Utility.Copier<Medicine, CreateMedicineDto>.Copy(medicines[i], medicineRef);
            }
            return medicinesDto;
        }

        [HttpGet("{id}")]
        public CreateMedicineDto GetMedicine(long id)
        {
            Medicine medicine = _repository.GetById(id);
            if (medicine != null)
            {
                var medicineDto = new CreateMedicineDto();
                Utility.Copier<Medicine, CreateMedicineDto>.Copy(medicine, medicineDto);
                return medicineDto;
            }

            return null;
        }

        [HttpPut]
        public void UpdateMedicine(CreateMedicineDto medicineDto)
        {
            var medicines = new Medicine();
            Utility.Copier<CreateMedicineDto, Medicine>.Copy(medicineDto, medicines);
            try
            {
                _repository.Update(medicines);
            }
            catch (System.Exception e)
            {

            }
        }

    }
}
