using Microsoft.EntityFrameworkCore;
using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace PMS.Repository.UserRepo
{
    public class UserRepository : EfCoreRepository<User, PMSContext>, IUserRepository
    {
        PMSContext _context;
        public UserRepository(PMSContext context) : base(context)
        {
            _context = context;
        }

        public override long Create(User entity)
        {
            entity.Created = DateTime.Now;
            entity.Updated = DateTime.Now;
            long roleId = _context.Roles.Where(x => x.Name == "Pharmacist").Select(x=>x.Id).FirstOrDefault();
            entity.RoleId = roleId;
            _context.Users.Add(entity);
            _context.SaveChanges();

            return (long)entity.Id;
        }

        public List<Role> GetAllRoles()
        {
            return _context.Roles.ToList();
        }

        public User getByUsernamePassowrd(string username, string password)
        {
            var user = _context.Users.Include(a => a.Role).SingleOrDefault(u => u.Username == username && u.Password == password);
            if (user != null)
            {
                return user;
            }
            return null;
        }

        public User GetUserWithRole(long Id)
        {
            return _context.Users.Include(x => x.Role).Where(x => x.Id == Id).FirstOrDefault();
        }
    }
}
