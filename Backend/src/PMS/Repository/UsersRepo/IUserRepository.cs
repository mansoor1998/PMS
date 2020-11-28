using Microsoft.AspNetCore.SignalR;
using PMS.DataAccess.Models;
using System.Collections.Generic;

namespace PMS.Repository.UserRepo
{
    public interface IUserRepository : IRepository<User>
    {
        public User getByUsernamePassowrd(string username, string password);
        public User GetUserWithRole(long Id);
        public List<Role> GetAllRoles();
    }
}
