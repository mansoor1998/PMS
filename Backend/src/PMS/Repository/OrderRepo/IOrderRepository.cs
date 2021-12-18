using Microsoft.AspNetCore.SignalR;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;

namespace PMS.Repository.OrderRepo
{
    public interface IOrderRepository : IRepository<Order>
    {
        Order GetCurrentOrder(long userId);
        public List<Cart> GetWidgetData();
        public List<Order> GetSalesReport(DateTime from, DateTime to);
    }
}
