using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMS.DataAccess.Models;
using PMS.Dto;
using PMS.Dto.Cart;
using PMS.Dto.Medicine;
using PMS.Dto.Order;
using PMS.Repository.CartRepo;
using PMS.Repository.MedicineRepo;
using PMS.Repository.OrderRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace PMS.Controllers
{
    [Authorize(Roles = "Pharmacist,Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderRepository _orderRepository;
        ICartRepository _cartRepossitory;
        //IInvoiceRepository _invoiceRepository;
        IMedicineRepository _medicineRepository;
        public OrderController(IOrderRepository orderRepository, ICartRepository cartRepossitory, IMedicineRepository medicineRepository)
        {
            _orderRepository = orderRepository;
            _cartRepossitory = cartRepossitory;
            _medicineRepository = medicineRepository;
        }
        [HttpPost("add")]
        public GetMedicineDto AddToCart(CreateCartDto product)
        {
            var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            
            Medicine medicine =_medicineRepository.GetById(product.MedicineId);
            if (medicine == null) return null;
            long diff = medicine.Quantity - product.Quantity;
            if (diff > 0)
            {
                // create or update the cart
                Cart cart = _cartRepossitory.GetByMedicineId(medicine.Id, userId);
                if (cart != null)
                {
                    cart.Quantity = cart.Quantity + product.Quantity;
                    _cartRepossitory.Update(cart);
                }
                else
                {
                    cart = new Cart();
                    cart.MedicineId = (long)medicine.Id;
                    cart.UserId = userId;
                    cart.Quantity = product.Quantity;
                    _cartRepossitory.Create(cart);
                }

                // update the medicine.
                medicine.Quantity = diff;
                _medicineRepository.Update(medicine);

                GetMedicineDto medicineDto = new GetMedicineDto();
                Utility.Copier<Medicine, GetMedicineDto>.Copy(medicine, medicineDto);

                return medicineDto;
            }

            return null;
            

            //_orderRepository
        }
        [HttpDelete("cart/{id}")]
        public void RemoveFromCart(long id)
        {
            var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var cart = _cartRepossitory.GetById(id);
            if ( cart != null )
            {
                long quantity = cart.Quantity;
                long medicineId = cart.MedicineId;
                var medicine = _medicineRepository.GetById(medicineId);
                if(medicine != null)
                {
                    medicine.Quantity += quantity;
                    _medicineRepository.Update(medicine);
                    _cartRepossitory.Delete(cart);
                }
            }
        }

        [HttpPost]
        public GetOrderDto CreateOrder(CreateOrderDto orderDto)
        {
            long userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            string customerName = orderDto.CustomerName;

            var carts = _cartRepossitory.GetAllIncluding(x=> x.Medicine, 0, 100, x => x.UserId == userId).ArrayList;

            List<OrderItem> orderItems = new List<OrderItem>();
            for (int i = 0; i < carts.Count; i++)
            {
                OrderItem orderItem = new OrderItem();
                orderItem.MedicineName = carts[i].Medicine.Name;
                orderItem.BatchCode = carts[i].Medicine.BatchCode;
                orderItem.PricePerUnit = carts[i].Medicine.PricePerUnit;
                orderItem.Quantity = carts[i].Medicine.Quantity;

                orderItems.Add(orderItem);
            }

            Order order = new Order();
            order.UserId = userId;
            order.OrderItems = orderItems;
            order.CustomerName = customerName;
            order.OrderNumber = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12).Select(s => s[(new Random()).Next(s.Length)]).ToArray());

            _orderRepository.Create(order);
            _cartRepossitory.DeleteBulk(carts);

            return new GetOrderDto()
            {
                OrderNumber = order.OrderNumber
            };
        }

        [HttpGet("{orderNumber}")]
        public GetOrderDto GetByOrderNumber(string orderNumber)
        {
            Order order = null;
            List<Order> list = _orderRepository.GetAllIncluding(x => x.OrderItems, 0, 1, x => x.OrderNumber == orderNumber).ArrayList;
            if (list.Count == 0) return null;

            order = list[0];
            GetOrderDto orderDto = new GetOrderDto();

            Utility.Copier<Order, GetOrderDto>.Copy(order, orderDto);

            List<GetOrderItemDto> orderItemDtos = new List<GetOrderItemDto>();

            for (int i = 0; i < order?.OrderItems.Count; i++)
            {
                var orderItemDto = new GetOrderItemDto();
                Utility.Copier<OrderItem, GetOrderItemDto>.Copy(order.OrderItems[i], orderItemDto);
                orderItemDtos.Add(orderItemDto);
            }

            orderDto.OrderItems = orderItemDtos;

            return orderDto;
        }

        //[HttpPost("checkout")]
        //public void CheckOut()
        //{
        //    // Make the order finalized.
        //    var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        //    Order order = _orderRepository.GetCurrentOrder(userId);
        //    //order.finalized = true;
        //    //order.FinalizedDate = DateTime.Now;
        //    _orderRepository.Update(order);
        //    // An invoice should be created
        //    long orderId = (long)order.Id;
        //    //Invoice invoice = new Invoice();
        //    //invoice.InvoiceNo = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12).Select(s => s[(new Random()).Next(s.Length)]).ToArray());
        //    //invoice.OrderId = orderId;
        //    //_invoiceRepository.Create(invoice);
        //}

        [HttpGet("history")]
        public List<Cart> ShowOrderHistory()
        {
            return _orderRepository.GetWidgetData();
        }

        [HttpGet("carts")]
        public AsyncListDto<GetCartDto> GetAllOrderCarts([FormQuery] int? skip, [FormQuery] int? max, [FormQuery] string search = null)
        {
            //var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            //List<Cart> result = _cartRepossitory.GetAllCarts(userId);
            //List<GetCartDto> cartDto = new List<GetCartDto>();
            //for (int i = 0; i < result.Count; i++)
            //{
            //    // transfer cart contents
            //    GetCartDto tempCartDto = new GetCartDto();
            //    Utility.Copier<Cart, GetCartDto>.Copy(result[i], tempCartDto);
            //    // transfer medicine contents.
            //    CreateMedicineDto medicineDto = new CreateMedicineDto();
            //    Medicine medicine = result[i].Medicine;
            //    Utility.Copier<Medicine, CreateMedicineDto>.Copy(medicine, medicineDto);
            //    tempCartDto.Medicine = medicineDto;

            //    cartDto.Add(tempCartDto);
            //}

            //return cartDto;
            var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var cartsAsync = _cartRepossitory.GetAllIncluding(x => x.Medicine, skip, max, x => x.UserId == userId);
            List<GetCartDto> cartsDto = new List<GetCartDto>();
            var carts = cartsAsync.ArrayList;
            for (int i = 0; i < carts.Count; i++)
            {
                GetCartDto cartRef = new GetCartDto();
                cartsDto.Add(cartRef);
                Utility.Copier<Cart, GetCartDto>.Copy(carts[i], cartRef);
                cartRef.MedicineName = carts[i].Medicine.Name;
                cartRef.MedicineQuantity = (long)carts[i].Quantity;
                cartRef.MedicinePricePerUnit = carts[i].Medicine.PricePerUnit;
            }

            return new AsyncListDto<GetCartDto>() { total = cartsAsync.total, ArrayList = cartsDto };
        }

        [HttpPost("report")]
        public List<GetOrderDto> GetSoldReports(ReportDate date)
        {
            DateTime from = date.From;
            DateTime to = date.To;

            List<Order> orders  = _orderRepository.GetSalesReport(from, to);

            List<GetOrderDto> orderDto = new List<GetOrderDto>();
            for (int i = 0; i < orders.Count; i++)
            {
                var orderRef = new GetOrderDto();
                orderRef.OrderItems = new List<GetOrderItemDto>();
                Utility.Copier<Order, GetOrderDto>.Copy(orders[i], orderRef);
                for(int j = 0; j < orders[i].OrderItems.Count; j++)
                {
                    var orderItemRef = new GetOrderItemDto();
                    Utility.Copier<OrderItem, GetOrderItemDto>.Copy(orders[i].OrderItems[j], orderItemRef);
                    orderRef.OrderItems.Add(orderItemRef);
                }

                orderDto.Add(orderRef);
            }


            return orderDto;
        }

        //[HttpDelete("cart/{id}")]
        //public void DeleteCart(long id)
        //{
        //    var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        //    var cart = _cartRepossitory.GetById(id);
        //    if ( cart.UserId == userId )
        //        _cartRepossitory.Delete(cart);
        //}
    }
}
