﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using PMS.Dto.MedicineCompany;
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
        public List<CreateCompanyDto> GetAllCompanies()
        {   
            var companies = _repository.GetAll();
            List<CreateCompanyDto> companiesDto = new List<CreateCompanyDto>();
            for (int i = 0; i < companies.Count; i++)
            {
                CreateCompanyDto companyRef = new CreateCompanyDto();
                companiesDto.Add(companyRef);
                Utility.Copier<MedicalCompany, CreateCompanyDto>.Copy(companies[i], companyRef);
            }
            return companiesDto;
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
            var medicalCompany = new MedicalCompany();
            Utility.Copier<CreateCompanyDto, MedicalCompany>.Copy(companyDto, medicalCompany);
            try
            {
                _repository.Update(medicalCompany);
            }
            catch (System.Exception e)
            {

            }
        }

        [AllowAnonymous]
        [HttpGet("test")]
        public string RandomFunction()
        {

            Response.OnCompleted(ContextCall);


            return "This has been returned";

        }

        private async Task ContextCall()
        {
            for (int i = 0; i < 1000; i++)
            {
                var a = new MedicalCompany();
                a.Name = "random";
                a.UserId = 3;
                _context.MedicalCompanies.Add(a);
            }
            _context.SaveChanges();
        }
    }
}
