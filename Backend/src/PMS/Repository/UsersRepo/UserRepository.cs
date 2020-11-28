using Microsoft.EntityFrameworkCore;
using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
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
