using Microsoft.AspNetCore.Mvc;

namespace PMS.Dto.User
{
    public class CreateUserDto
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Contact { get; set; }
        public string Password { get; set; }
        public bool Gender { get; set; }
        public long RoleId { get; set; }
    }
}
