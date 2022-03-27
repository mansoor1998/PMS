using PMS.Dto.Medicine;
using System;

namespace PMS.Dto.Cart
{
    public class GetCartDto
    {
        public long Id { get; set; }
        //public long Quantity { get; set; }
        public long MedicineId { get; set; }
        public CreateMedicineDto Medicine { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public string MedicineName { get; set; }
        public long MedicineQuantity { get; set; }
        public double MedicinePricePerUnit { get; set; }
    }
}
