using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.Medicine
{
    public class CreateMedicineDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string BatchCode { get; set; }
        public DateTime MGFDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public double Quantity { get; set; }
        public double PricePerUnit { get; set; }
        public long? MedicalCompanyId { get; set; }
    }
}
