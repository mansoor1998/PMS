using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.User
{
    public class AppSession
    {
        public long userId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string RoleName { get; set; }
        public List<string> AllRoles { get; set; } 
    }
}
