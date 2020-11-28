using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMS.DataAccess.Models;
using PMS.Dto.Cart;
using PMS.Dto.Medicine;
using PMS.Repository.CartRepo;
using PMS.Repository.InvoiceRepo;
using PMS.Repository.MedicineRepo;
using PMS.Repository.OrderRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Claims;

namespace PMS.Controllers
{
    //[Authorize(Roles = "Pharmasit")]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderRepository _orderRepository;
        ICartRepository _cartRepossitory;
        IInvoiceRepository _invoiceRepository;
        IMedicineRepository _medicineRepository;
        public OrderController(IOrderRepository orderRepository, ICartRepository cartRepossitory, IInvoiceRepository invoiceRepository, IMedicineRepository medicineRepository)
        {
            _orderRepository = orderRepository;
            _cartRepossitory = cartRepossitory;
            _invoiceRepository = invoiceRepository;
            _medicineRepository = medicineRepository;
        }
        [HttpPost("add")]
        public void AddToCart(CreateCartDto product)
        {
            var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var order = _orderRepository.GetCurrentOrder(userId);
            long orderId;
            if (order == null)
            {
                var currentOrder = new Order();
                currentOrder.UserId = userId;
                currentOrder.finalized = false;
                orderId = _orderRepository.Create(currentOrder);
            }
            else
            {
                orderId = order.Id;
            }
            Medicine medicine =_medicineRepository.GetById(product.MedicineId);
            double diff = medicine.Quantity - product.Quantity;
            if ( diff > 0)
            {
                Cart cart = new Cart();
                Utility.Copier<CreateCartDto, Cart>.Copy(product, cart);
                cart.OrderId = orderId;
                cart.MedicineId = medicine.Id;
                cart.Quantity = product.Quantity;
                _cartRepossitory.Create(cart);
                medicine.Quantity = diff;
                _medicineRepository.Update(medicine);
            }
            

            //_orderRepository
        }
        [HttpDelete("{id}")]
        public void RemoveFromCart(long id)
        {
            var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if ( _cartRepossitory.VerifyUserCart(userId,id))
            {
                Cart cart = new Cart();
                cart.Id = id;
                double quantity = cart.Quantity;
                long medicineId = cart.MedicineId;
                var medicine = _medicineRepository.GetById(medicineId);
                medicine.Quantity += quantity; 
                _medicineRepository.Update(medicine);
                _cartRepossitory.Delete(cart);
            }
        }

        [HttpPost("checkout")]
        public void CheckOut()
        {
            // Make the order finalized.
            var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            Order order = _orderRepository.GetCurrentOrder(userId);
            order.finalized = true;
            order.FinalizedDate = DateTime.Now;
            _orderRepository.Update(order);
            // An invoice should be created
            long orderId = order.Id;
            Invoice invoice = new Invoice();
            invoice.InvoiceNo = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12).Select(s => s[(new Random()).Next(s.Length)]).ToArray());
            invoice.OrderId = orderId;
            _invoiceRepository.Create(invoice);
        }

        [HttpGet("history")]
        public List<Cart> ShowOrderHistory()
        {
            return _orderRepository.GetWidgetData();
        }

        [HttpGet("carts")]
        public List<GetCartDto> GetAllOrderCarts()
        {
            var userId = Int64.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            List<Cart> result = _cartRepossitory.GetAllCarts(userId);
            List<GetCartDto> cartDto = new List<GetCartDto>();
            for (int i = 0; i < result.Count; i++)
            {
                // transfer cart contents
                GetCartDto tempCartDto = new GetCartDto();
                Utility.Copier<Cart, GetCartDto>.Copy(result[i], tempCartDto);
                // transfer medicine contents.
                CreateMedicineDto medicineDto = new CreateMedicineDto();
                Medicine medicine = result[i].Medicine;
                Utility.Copier<Medicine, CreateMedicineDto>.Copy(medicine, medicineDto);
                tempCartDto.Medicine = medicineDto;

                cartDto.Add(tempCartDto);
            }

            return cartDto;
        } 

    }
}
