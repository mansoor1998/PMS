using Microsoft.AspNetCore.Mvc;
using PMS.DataAccess.Models;
using PMS.Repository;
using System;
using System.Collections.Generic;

namespace PMS.Controllers
{
    public abstract class AsyncCrudAppController<TEntity, TEntityGetDto, TEntityCreateDto> : ControllerBase
        where TEntity : class, IEntity
        where TEntityGetDto : class
        where TEntityCreateDto: class
    {
        private readonly IRepository<TEntity> _repository;

        public AsyncCrudAppController(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public virtual List<TEntityGetDto> GetAll([FromQuery(Name = "SkipCount")] int? SkipCount, [FromQuery(Name = "MaxResultCount")] int? MaxResultCount)
        {
            var result = _repository.GetAll(SkipCount, MaxResultCount);
            List<TEntityGetDto> DtoResult = new List<TEntityGetDto>();
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
        [HttpPost]
        public virtual void Create(TEntityCreateDto data)
        {
            TEntity entity = (TEntity)Activator.CreateInstance(typeof(TEntity), new object[] { });
            Utility.Copier<TEntityCreateDto, TEntity>.Copy(data, entity);
            try
            {
                _repository.Create(entity);
            }
            catch (Exception e)
            {}
        }
        [HttpDelete("{id}")]
        public virtual void Delete(long Id)
        {
            _repository.SoftDelete(Id);
        }

    }
}
