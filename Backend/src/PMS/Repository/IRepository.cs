﻿using PMS.DataAccess.Models;
using System.Collections.Generic;
using System.Security.Policy;

namespace PMS.Repository
{
    public interface IRepository<T> where T : class, IEntity
    {
        public long Create(T entity);
        public List<T> GetAll(int? SkipCount = null, int? MaxResultCount = null);
        public T GetById(long Id);
        public void Update(T entity);
        public void Delete(T entity);
        public void Delete(long id);
        public void SoftDelete(long Id);
    }
}
