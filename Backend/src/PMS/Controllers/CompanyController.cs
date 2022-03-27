using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using PMS.Dto;
using PMS.Dto.MedicineCompany;
using PMS.Repository;
using PMS.Repository.MedicalCompanyRepo;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace PMS.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/medicine/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        IMedicalCompanyRepository _repository;
        private PMSContext _context;

        public CompanyController(IMedicalCompanyRepository repository, PMSContext context)
        {
            _repository = repository;
            _context = context;
        }

        [HttpPost]
        public void CreateComapny(CreateCompanyDto companyDto)
        {
            var entity = new MedicalCompany();
            Utility.Copier<CreateCompanyDto, MedicalCompany>.Copy( companyDto, entity );
            entity.UserId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            _repository.Create(entity);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public AsyncListDto<CreateCompanyDto> GetAllCompanies([FormQuery] int? skip, [FormQuery] int? max, [FormQuery] string search = null)
        {   
            var companiesAsync = _repository.GetAll(skip, max, 
                x => x.Name.Contains(search != null ? search : "") || x.Description.Contains(search != null ? search : ""));
            List<CreateCompanyDto> companiesDto = new List<CreateCompanyDto>();
            var companies = companiesAsync.ArrayList;
            for (int i = 0; i < companies.Count; i++)
            {
                CreateCompanyDto companyRef = new CreateCompanyDto();
                companiesDto.Add(companyRef);
                Utility.Copier<MedicalCompany, CreateCompanyDto>.Copy(companies[i], companyRef);
            }
            return new AsyncListDto<CreateCompanyDto>() { total = companiesAsync.total, ArrayList = companiesDto };
        }
        [HttpGet("{id}")]
        public CreateCompanyDto GetCompany(long id)
        {
            MedicalCompany company = _repository.GetById(id);
            if (company != null)
            {
                var companyDto = new CreateCompanyDto();
                Utility.Copier<MedicalCompany, CreateCompanyDto>.Copy(company, companyDto);
                return companyDto;
            }

            return null;
        }

        [HttpPut]
        public void UpdateCompany(CreateCompanyDto companyDto)
        {
            try
            {
                var company = _repository.GetById(companyDto.Id);
                Utility.Copier<CreateCompanyDto, MedicalCompany>.Copy(companyDto, company);
                _repository.Update(company);
            }
            catch (System.Exception e)
            {

            }
        }


        [HttpDelete("{id}")]
        public void DeleteCompany(long id)
        {
            _repository.SoftDelete(id);
        }

        [AllowAnonymous]
        [HttpGet("test")]
        public string RandomFunction()
        {

            //Response.OnCompleted(ContextCall);


            return "This has been returned";

        }

        //private async Task ContextCall()
        //{
        //    for (int i = 0; i < 1000; i++)
        //    {
        //        var a = new MedicalCompany();
        //        a.Name = "random";
        //        a.UserId = 3;
        //        _context.MedicalCompanies.Add(a);
        //    }
        //    _context.SaveChanges();
        //}
    }
}
