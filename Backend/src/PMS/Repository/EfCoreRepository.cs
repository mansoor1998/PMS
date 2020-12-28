using Microsoft.EntityFrameworkCore;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Repository
{
    public abstract class EfCoreRepository<TEntity, TContext> : IRepository<TEntity>
        where TEntity : class, IEntity
        where TContext : DbContext
    {
        TContext _context;

        public EfCoreRepository(TContext context)
        {
            _context = context;
        }

        public long Create(TEntity entity)
        {
            entity.Created = DateTime.Now;
            entity.Updated = DateTime.Now;
            _context.Set<TEntity>().Add(entity);
            _context.SaveChanges();

            return entity.Id;
        }

        /*
         * Get All Entites with Pagination.
         * SkipCount , MaxResultcount are optional parameters.
         * If SkipCount is defined it will skip the data in result.
         * MaxResult selects the amount of data needed to be selected.
         */
        public List<TEntity> GetAll(int? SkipCount = null, int? MaxResultCount = null)
        {
            IQueryable<TEntity> EntityQuery = _context.Set<TEntity>();
            EntityQuery = (SkipCount != null) ? EntityQuery.Skip((int) SkipCount) : EntityQuery;

            if (MaxResultCount <= 0) throw new InvalidOperationException(MaxResultCount.GetType().Name + " cannot be less than or equal to 0");

            EntityQuery = (MaxResultCount != null) ? EntityQuery.Take((int)MaxResultCount) : EntityQuery;
            return EntityQuery.ToList();
        }

        public TEntity GetById(long Id)
        {
            return _context.Set<TEntity>().FirstOrDefault( I => I.Id == Id );
        }

        public void Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
            _context.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            entity.Updated = DateTime.Now;
            _context.Set<TEntity>().Update(entity);
            _context.SaveChanges();
        }

        public void Delete(long id)
        {
            TEntity entity = (TEntity) Activator.CreateInstance( typeof(TEntity), new object { } );
            entity.Id = id;
            _context.Set<TEntity>().Remove(entity);
            _context.SaveChanges();
        }

        /*
         * Attach the object to database and Set IsDelted to True
         */
        public void SoftDelete(long Id)
        {
            TEntity entity = (TEntity)Activator.CreateInstance(typeof(TEntity), new object[] { });

            entity.IsDeleted = true;
            entity.Id = Id;

            var entityContext = _context.Set<TEntity>();
            entityContext.Attach(entity);
            _context.Entry(entity).Property(x => x.IsDeleted).IsModified = true;
            _context.SaveChanges();
        }
    }   
}
