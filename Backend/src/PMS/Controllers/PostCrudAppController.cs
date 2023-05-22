using Microsoft.AspNetCore.Mvc;
using PMS.DataAccess.Models;
using PMS.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Controllers
{
    public abstract class PostCrudAppController<TEntity, TEntityCreateDto> : ControllerBase
        where TEntity : class, IEntity
        where TEntityCreateDto : class
    {

        private readonly IRepository<TEntity> _repository;

        public PostCrudAppController(IRepository<TEntity> repository)
        {
            _repository = repository;
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
            { }
        }
    }
}
