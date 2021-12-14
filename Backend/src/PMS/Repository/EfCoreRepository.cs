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

            return (long)entity.Id;
        }

        /*
         * Get All Entites with Pagination.
         * SkipCount , MaxResultcount are optional parameters.
         * If SkipCount is defined it will skip the data in result.
         * MaxResult selects the amount of data needed to be selected.
         */
        public AsyncList<TEntity> GetAll(int? SkipCount = null, int? MaxResultCount = null)
        {
            IQueryable<TEntity> EntityQuery = _context.Set<TEntity>().OrderByDescending(x => x.Created);
            int total = EntityQuery.Count();
            EntityQuery = (SkipCount != null) ? EntityQuery.Skip((int) SkipCount) : EntityQuery;

            if (MaxResultCount <= 0) throw new InvalidOperationException(MaxResultCount.GetType().Name + " cannot be less than or equal to 0");

            EntityQuery = (MaxResultCount != null) ? EntityQuery.Take((int)MaxResultCount) : EntityQuery;

            var result = EntityQuery.ToList();

            return new AsyncList<TEntity>()
            {
                total = total,
                ArrayList = result
            };
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
            //throw new Exception();
            //TEntity entity = (TEntity)Activator.CreateInstance(typeof(TEntity), new object[] {  });

            //  _context.Set<TEntity>().Update (); //.FirstOrDefault(I => I.Id == Id);

            TEntity result = this.GetById(Id);
            result.IsDeleted = true;
            this.Update(result);

            //entity.IsDeleted = true;
            //entity.Id = Id;

            //var entityContext = _context.Set<TEntity>();
            //entityContext.Attach(entity);
            //_context.Entry(entity).Property(x => x.IsDeleted).IsModified = true;
            //_context.SaveChanges();
        }

        public AsyncList<TEntity> GetAllIncluding(System.Linq.Expressions.Expression<Func<TEntity, object>> navigationType, int? SkipCount = null, int? MaxResultCount = null)
        {
            IQueryable<TEntity> EntityQuery = _context.Set<TEntity>();
            int total = EntityQuery.Count();

            try
            {
                // join query with navigation property
                EntityQuery = EntityQuery.Include(navigationType).OrderByDescending(x => x.Created);

                // paginate the result.
                EntityQuery = (SkipCount != null) ? EntityQuery.Skip((int)SkipCount) : EntityQuery;
                if (MaxResultCount <= 0) throw new InvalidOperationException(MaxResultCount.GetType().Name + " cannot be less than or equal to 0");
                EntityQuery = (MaxResultCount != null) ? EntityQuery.Take((int)MaxResultCount) : EntityQuery;
                
                // execute the result.
                var result = EntityQuery.ToList();

                return new AsyncList<TEntity>()
                {
                    total = total,
                    ArrayList = result
                };
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }   
}
