using Microsoft.AspNetCore.SignalR;
using PMS.DataAccess.Models;
using PMS.Dto.Order;
using System;
using System.Collections.Generic;

namespace PMS.Repository.OrderRepo
{
    public interface IOrderRepository : IRepository<Order>
    {
        public Order GetCurrentOrder(long userId);
        public GetWidgetsData GetWidgetData();
        public List<Order> GetSalesReport(DateTime from, DateTime to, bool getUserDetail = false);
        public List<SaleCount> GetDailySales();
    }
}
