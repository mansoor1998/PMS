using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PMS.DataAccess.Models;
using PMS.Dto;
using PMS.Dto.User;
using PMS.Repository.UserRepo;

namespace PMS.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserRepository _repository;
        public UserController(IUserRepository repository)
        {
            _repository = repository;
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public TokenDto Authenticate(AuthDto auth)
        {
            string hashPass = generateHash(auth.Password);
            User user = _repository.getByUsernamePassowrd(auth.Username, hashPass);

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("PMS_ZNbH9hR7HtHI");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role.Name),
                    new Claim(ClaimTypes.NameIdentifier , user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            string stringToken = tokenHandler.WriteToken(token);

            TokenDto tokenDto = new TokenDto { JWT = stringToken };

            return tokenDto;

        }

        [HttpPost]
        public bool CreateUser(CreateUserDto user)
        {

            string hashString = this.generateHash(user.Password);
            var entity = new User();
            Utility.Copier<CreateUserDto, User>.Copy( user, entity );
            entity.Password = hashString;

            try
            {
                _repository.Create(entity);
            }
            catch (Exception e)
            {
                return false;
            }
            return true;
        }

        [AllowAnonymous]
        [HttpGet("GetUserConfiguration")]
        public AppSession GetAllConfiguration()
        {
            long userId = 0;
            DataAccess.Models.User user = null;
            var identity = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (identity != null)
            {
                userId = Int64.Parse(identity);
                user = _repository.GetUserWithRole(userId);
            }

            List<Role> allRoles = _repository.GetAllRoles();

            AppSession appSession = new AppSession();
            if (user == null)
            {
                return appSession;
            }
            try
            {
                appSession.userId = user.Id;
                appSession.Username = user.Username;
                appSession.Name = user.Name;
                appSession.RoleName = user.Role.Name;
                appSession.AllRoles = new List<string>();
                if (allRoles != null)
                {
                    for (int i = 0; i < allRoles.Count; i++)
                    {
                        appSession.AllRoles.Add(allRoles[i].Name);
                    }
                }
            }
            catch(Exception e)
            {

            }

            return appSession;
        }
        [HttpGet]
        public List<CreateUserDto> GetAllUsers()
        {
            var users =  _repository.GetAll();
            List<CreateUserDto> usersDto = new List<CreateUserDto>();
            for (int i = 0; i < users.Count; i++)
            {
                CreateUserDto userDtoSingle = new CreateUserDto();
                Utility.Copier<User, CreateUserDto>.Copy(users[i], userDtoSingle);
                usersDto.Add(userDtoSingle);
            }
            return usersDto;
        }

        public string generateHash(string text)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(text);
            SHA256Managed hashstring = new SHA256Managed();
            byte[] hash = hashstring.ComputeHash(bytes);
            string hashString = string.Empty;
            foreach (byte x in hash)
            {
                hashString += String.Format("{0:x2}", x);
            }
            return hashString;
        }

    }
}
