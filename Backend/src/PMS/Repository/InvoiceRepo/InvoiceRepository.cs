using Microsoft.EntityFrameworkCore;
using PMS.DataAccess.DataAccess;
using PMS.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Repository.InvoiceRepo
{
    public class InvoiceRepository : EfCoreRepository<Invoice, PMSContext>, IInvoiceRepository
    {
        PMSContext _context;
        public InvoiceRepository(PMSContext context) : base(context)
        {
        }

        public List<Invoice> GetAllInvoiceHistory()
        {
            return _context.Invoices.Include(i => i.Order)
                .ThenInclude(o => o.Carts)
                .ToList();
        }
    }
}
