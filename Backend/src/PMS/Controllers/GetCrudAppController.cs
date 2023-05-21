using Microsoft.AspNetCore.Mvc;
using PMS.DataAccess.Models;
using PMS.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Controllers
{
    // this one is only for the get request. the other request are not going to be included.
    public abstract class GetCrudAppController<TEntity, TEntityGetDto> : ControllerBase
        where TEntity : class, IEntity
        where TEntityGetDto : class
    {
        private readonly IRepository<TEntity> _repository;

        public GetCrudAppController(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public virtual List<TEntityGetDto> GetAll([FromQuery(Name = "SkipCount")] int? SkipCount, [FromQuery(Name = "MaxResultCount")] int? MaxResultCount)
        {
            var resultAsync = _repository.GetAll(SkipCount, MaxResultCount);
            List<TEntityGetDto> DtoResult = new List<TEntityGetDto>();
            var result = resultAsync.ArrayList;
            for (int i = 0; i < result.Count; i++)
            {
                TEntityGetDto copier = (TEntityGetDto)Activator.CreateInstance(typeof(TEntityGetDto), new object[] { });
                Utility.Copier<TEntity, TEntityGetDto>.Copy(result[i], copier);
                DtoResult.Add(copier);
            }

            return DtoResult;
        }

        [HttpGet("{id}")]
        public virtual TEntityGetDto GetById(long Id)
        {
            TEntity result = _repository.GetById(Id);
            TEntityGetDto copier = (TEntityGetDto)Activator.CreateInstance(typeof(TEntityGetDto), new object[] { });
            Utility.Copier<TEntity, TEntityGetDto>.Copy(result, copier);

            return copier;
        }
    }
}
