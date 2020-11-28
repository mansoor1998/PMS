using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Query.Internal;
using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;

namespace PMS.Repository.OrderRepo
{
    public class OrderRepository : EfCoreRepository<Order, PMSContext>, IOrderRepository
    {
        PMSContext _context;
        public OrderRepository(PMSContext context) : base(context)
        {
            _context = context;
        }

        public Order GetCurrentOrder(long userId)
        {
            return _context.Orders.SingleOrDefault(o => o.UserId == userId && o.finalized == false);
        }

        public void GetSalesReport()
        {
            /*_context.Carts.Join(
                _context.Orders,
                );*/
            _context.Orders.Join(
               _context.Carts,
               order => order.Id,
               cart => cart.OrderId,
               (order, cart) => new { order, cart }
            ).Join(
                _context.Medicines,
                c => c.cart.MedicineId,
                m => m.Id,
                (combine, medicine) => new { combine , medicine }
               ).GroupBy( x => new { x.combine.order.Id, x.combine.order.UserId } ).Select(
                    r => new
                    {
                        id = r.Key.Id,
                        userId = r.Key.UserId,
                        amount = r.Sum( a => a.combine.cart.Quantity * a.medicine.PricePerUnit )
                    }
                )  ;
        }

        public List<Cart> GetWidgetData()
        {
            /*return _context.Carts.Join(
               _context.Orders,
               cart => cart.OrderId,
               order => order.Id,
               (cart, order) => new { cart, order }
                ).Where( o => o.order.finalized == true ).Join(
                    _context.Medicines,
                    c => c.cart.MedicineId,
                    m => m.Id,
                    (c , m) => new Cart { Id = c.cart.Id, 
                        Quantity = c.cart.Quantity, Created = c.cart.Created, 
                        Medicine = new Medicine { PricePerUnit = m.PricePerUnit } }
                ).ToList();*/

            return _context.Carts.Include(c => c.Order)
                .Include(c => c.Medicine)
                .Where(c => c.Order.finalized == true && c.Created.Month == DateTime.Now.Month  && c.Created.Month == DateTime.Now.Year )
                .Select(c => new Cart
                {
                    Id = c.Id,
                    Quantity = c.Quantity,
                    Created = c.Created,
                    Medicine = new Medicine { PricePerUnit = c.Medicine.PricePerUnit }
                }).ToList();
        }
    }
}
