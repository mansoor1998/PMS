using Microsoft.AspNetCore.SignalR;
using PMS.DataAccess.Models;
using System.Collections.Generic;

namespace PMS.Repository.OrderRepo
{
    public interface IOrderRepository : IRepository<Order>
    {
        Order GetCurrentOrder(long userId);
        public List<Cart> GetWidgetData();
    }
}
