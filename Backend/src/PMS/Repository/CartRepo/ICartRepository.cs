using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Repository.CartRepo
{
    public interface ICartRepository : IRepository<Cart>
    {
        public bool VerifyUserCart(long userId, long cartId);
        public List<Cart> GetAllCarts(long userId);
    }
}
