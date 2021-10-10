using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.User
{
    public class GetUserDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Contact { get; set; }
        public bool Gender { get; set; }
        public long RoleId { get; set; }
    }
}
