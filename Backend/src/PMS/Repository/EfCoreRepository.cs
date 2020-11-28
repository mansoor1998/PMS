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

        public List<TEntity> GetAll()
        {
            return _context.Set<TEntity>().ToList();
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
    }   
}
