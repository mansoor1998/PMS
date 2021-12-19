using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Query.Internal;
using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using PMS.Dto.Order;
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

        public Order GetCurrentOrder(long id)
        {
            //_context.Orders.Where(o => o.Id == id).Include(x => x.);

            return null;
        }

        public List<Order> GetSalesReport(DateTime from, DateTime to, bool getUserDetail = false)
        {
            /*_context.Carts.Join(
                _context.Orders,
                );*/

            //_context.Orders.Join(
            //   _context.Carts,
            //   order => order.Id,
            //   cart => cart.OrderId,
            //   (order, cart) => new { order, cart }
            //).Join(
            //    _context.Medicines,
            //    c => c.cart.MedicineId,
            //    m => m.Id,
            //    (combine, medicine) => new { combine , medicine }
            //   ).GroupBy( x => new { x.combine.order.Id, x.combine.order.UserId } ).Select(
            //        r => new
            //        {
            //            id = r.Key.Id,
            //            userId = r.Key.UserId,
            //            amount = r.Sum( a => a.combine.cart.Quantity * a.medicine.PricePerUnit )
            //        }
            //    )  ;

            var sales = _context.Orders.
                Where(x => from.Date.Date <= x.Created.Date && to.Date.Date >= x.Created.Date)
                .Include(x => x.OrderItems);
            if (!getUserDetail) return sales.ToList();
            return sales.Include(x => x.User).ToList();
            
        }

        public GetWidgetsData GetWidgetData()
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

            //return _context.Carts.Include(c => c.Order)
            //    .Include(c => c.Medicine)
            //    .Where(c => c.Order.finalized == true && c.Created.Month == DateTime.Now.Month  && c.Created.Month == DateTime.Now.Year )
            //    .Select(c => new Cart
            //    {
            //        Id = c.Id,
            //        Quantity = c.Quantity,
            //        Created = c.Created,
            //        Medicine = new Medicine { PricePerUnit = c.Medicine.PricePerUnit }
            //    }).ToList();
            int usersCount = _context.Users.Count();
            int medicalCompaniesCount = _context.MedicalCompanies.Count();
            int medicinesCount = _context.Medicines.Count();
            int orderCount = _context.Orders.Count();
            // last month
            int monthlyOrdersCount = _context.Orders.Where(x => DateTime.Now.Date.AddMonths(-1) <= x.Created.Date && DateTime.Now.Date >= x.Created.Date).Count();
            // today.
            int dailyOrderCount = _context.Orders.Where(x => DateTime.Now.Date == x.Created.Date).Count();
            int weeklyOrderCount = _context.Orders
                .Where(x => DateTime.Now.Date.AddHours(-168) <= x.Created.Date && DateTime.Now.Date >= x.Created.Date).Count();

            GetWidgetsData widgetData = new GetWidgetsData();

            widgetData.MedicalCompaniesCount = medicalCompaniesCount;
            widgetData.MedicinesCount = medicinesCount;
            widgetData.OrderCount = orderCount;
            widgetData.MonthlyOrdersCount = monthlyOrdersCount;
            widgetData.WeeklyOrderCount = weeklyOrderCount;
            widgetData.DailyOrderCount = dailyOrderCount;
            widgetData.UserCount = usersCount;
            return widgetData;
        }

        public List<SaleCount> GetDailySales()
        {
            return _context.Orders.Where(x => DateTime.Now.Date >= x.Created.Date && x.Created.Date >= DateTime.Now.AddHours(-168)).GroupBy(x => x.Created.Date, (x, y) => new SaleCount()
            {
                Created = x.Date,
                Count = y.Count()
            }).ToList();
        }

       
    }
}
