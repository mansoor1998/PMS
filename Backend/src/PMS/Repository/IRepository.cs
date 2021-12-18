using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Security.Policy;

namespace PMS.Repository
{
    public interface IRepository<T> where T : class, IEntity
    {
        public long Create(T entity);
        public AsyncList<T> GetAll(int? SkipCount = null, int? MaxResultCount = null, System.Linq.Expressions.Expression<Func<T, bool>> searchFilter = null);
        public T GetById(long Id);
        public void Update(T entity);
        public void Delete(T entity);
        public void SoftDelete(long Id);
        public AsyncList<T> GetAllIncluding(System.Linq.Expressions.Expression<Func<T, object>> navigationType, int? SkipCount = null, int? MaxResultCount = null, System.Linq.Expressions.Expression<Func<T, bool>> searchFilter = null);
    }
}
