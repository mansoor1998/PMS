using Microsoft.EntityFrameworkCore;
using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace PMS.Repository.CartRepo
{
    public class CartRepository : EfCoreRepository<Cart, PMSContext>, ICartRepository
    {
        PMSContext _context;
        public CartRepository(PMSContext context) : base(context)
        {
            _context = context;
        }

        public bool VerifyUserCart(long userId, long cartId)
        {
            int result = _context.Users
                .Join(
                    _context.Orders,
                    user => user.Id,
                    order => order.UserId,
                    (user, order) => new { userId = user.Id, orderId = order.Id, order.finalized }
                ).Join(
                    _context.Carts,
                    combined => combined.orderId,
                    carts => carts.OrderId,
                    (combined, carts) => new { userId = combined.userId, cartId = carts.Id, combined.finalized }
                ).Where( r =>  r.userId == userId && r.cartId == cartId && r.finalized == false ).Count();

            return (result > 0) ? true : false;
        }

        public List<Cart> GetAllCarts(long userId)
        {
            return _context.Orders
                .Join(
                    _context.Carts,
                    order => order.Id,
                    carts => carts.OrderId,
                    (order, cart) => new { cart, order }
                ).Where( o => o.order.UserId == userId ).Select( x => x.cart ).Include(x => x.Medicine).ToList();
        }
    }
}
