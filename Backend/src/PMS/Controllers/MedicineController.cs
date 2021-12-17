using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using PMS.DataAccess.Models;
using PMS.Dto;
using PMS.Dto.Medicine;
using PMS.Repository;
using PMS.Repository.MedicineRepo;

namespace PMS.Controllers
{
    //[Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        IMedicineRepository _repository;
        IRepository<Medicine> _generic;
        IRepository<MedicalCompany> _medicalCompany;
        public MedicineController(IMedicineRepository repository, IRepository<Medicine> generic, IRepository<MedicalCompany> medicalCompany)
        {
            _repository = repository;
            _generic = generic;
            _medicalCompany = medicalCompany;
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
        public AsyncListDto<CreateMedicineDto> GetAllMedicines([FormQuery] int? skip, [FormQuery] int? max, [FormQuery] string search = null)
        {
            var medicinesAsync = _repository.GetAllIncluding(x => x.MedicalCompany, skip, max, 
                x => x.Name.Contains(search != null ? search: "") || x.BatchCode.Contains(search != null ? search : "") || x.MedicalCompany.Name.Contains(search != null ? search : ""));
            List<CreateMedicineDto> medicinesDto = new List<CreateMedicineDto>();
            var medicines = medicinesAsync.ArrayList;
            for (int i = 0; i < medicines.Count; i++)
            {
                CreateMedicineDto medicineRef = new CreateMedicineDto();
                medicinesDto.Add(medicineRef);
                Utility.Copier<Medicine, CreateMedicineDto>.Copy(medicines[i], medicineRef);
                medicineRef.MedicalCompanyName = medicines[i].MedicalCompany?.Name;
            }

            return new AsyncListDto<CreateMedicineDto>() { total = medicinesAsync.total, ArrayList = medicinesDto };
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
            //var medicines = new Medicine();
            try
            {
                var medicine = _repository.GetById(medicineDto.Id);
                Utility.Copier<CreateMedicineDto, Medicine>.Copy(medicineDto, medicine);
                _repository.Update(medicine);
            }
            catch (System.Exception e)
            {

            }
        }

        [HttpDelete("{id}")]
        public void DeleteMedicine (long id)
        {
            _repository.SoftDelete(id);
        }

    }
}
