using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
using PMS.Repository;
using PMS.Repository.UserRepo;

namespace PMS.Controllers
{

    [Authorize(Roles = "Pharmacist,Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserRepository _repository;
        //IRepository<Role> _roleRepository;
        public UserController(IUserRepository repository)
        {
            _repository = repository;
            //_roleRepository = _roleRepository;
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

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public bool CreateUser(CreateUserDto user)
        {

            string hashString = this.generateHash(user.Password);
            var entity = new User();
            Utility.Copier<CreateUserDto, User>.Copy(user, entity);
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
                appSession.userId = (long)user.Id;
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
            catch (Exception e)
            {

            }

            return appSession;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public AsyncListDto<GetUserDto> GetAllUsers([FormQuery] int? skip = null, [FormQuery] int? max = null, [FormQuery] string search = null)
        {
            var usersAsync = _repository.GetAllIncluding(x => x.Role, skip, max, x => x.Name.Contains(search != null ? search : "") 
                                                                                            || x.Username.Contains(search != null ? search : "") 
                                                                                            || x.Contact.Contains(search != null ? search : null) || x.Role.Name.Contains(search != null ? search : null));
            List<GetUserDto> usersDto = new List<GetUserDto>();
            var users = usersAsync.ArrayList;
            for (int i = 0; i < users.Count; i++)
            {
                GetUserDto userRef = new GetUserDto();
                usersDto.Add(userRef);
                Utility.Copier<User, GetUserDto>.Copy(users[i], userRef);
                userRef.RoleName = users[i].Role?.Name;
                //Utility.Copier<User, CreateUserDto>.Copy(users[i], userDtoSingle);
            }
            return new AsyncListDto<GetUserDto>() { total = usersAsync.total, ArrayList = usersDto }; ;
        }

        [HttpPost("change-password")]
        public void ChangePassword(ChangePassword changePassword)
        {
            long userId = 0;
            DataAccess.Models.User user = null;
            var identity = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (identity != null)
            {
                userId = Int64.Parse(identity);
                user = _repository.GetById(userId);

                if(user.Password == this.generateHash(changePassword.PreviousPassword))
                {
                    string hashString = this.generateHash(changePassword.NewPassword);
                    user.Password = hashString;
                    try
                    {
                        _repository.Update(user);
                    }
                    catch (Exception e)
                    {
                        //throw new ClientErrorData();
                    }
                } 
                else
                {
                    throw new Exception("Previous password provided is wrong");
                }
            }
        }

        [HttpGet("roles")]
        public string[] GetAllRoles()
        {
            var result = _repository.GetAllRoles();
            return result.Select(x => x.Name).ToArray();
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
