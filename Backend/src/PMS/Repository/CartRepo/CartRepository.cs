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
            var result = _context.Carts.Where(x => x.UserId == userId && x.Id == cartId).FirstOrDefault();
            //int result = _context.Users
            //    .Join(
            //        _context.Orders,
            //        user => user.Id,
            //        order => order.UserId,
            //        (user, order) => new { userId = user.Id, orderId = order.Id, order.finalized }
            //    ).Join(
            //        _context.Carts,
            //        combined => combined.orderId,
            //        carts => carts.OrderId,
            //        (combined, carts) => new { userId = combined.userId, cartId = carts.Id, combined.finalized }
            //    ).Where( r =>  r.userId == userId && r.cartId == cartId && r.finalized == false ).Count();

            //return (result > 0) ? true : false;

            return result != null ? true : false;
        }

        public List<Cart> GetAllCarts(long userId)
        {
            //return _context.Orders
            //    .Join(
            //        _context.Carts,
            //        order => order.Id,
            //        carts => carts.OrderId,
            //        (order, cart) => new { cart, order }
            //    ).Where( o => o.order.UserId == userId ).Select( x => x.cart ).Include(x => x.Medicine).ToList();

            return null;
        }

        public Cart GetByMedicineId(long id, long? userId = null)
        {
            return _context.Carts.FirstOrDefault(x => x.MedicineId == id && x.UserId == userId);
        }

        public void DeleteBulk(List<Cart> carts)
        {
            _context.Carts.RemoveRange(carts);
            _context.SaveChanges();
        }
    }
}
