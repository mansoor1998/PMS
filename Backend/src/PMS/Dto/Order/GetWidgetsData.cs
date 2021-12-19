using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.Order
{
    public class GetWidgetsData
    {
        public int MedicalCompaniesCount { get; set; }
        public int MedicinesCount { get; set; }
        public int OrderCount { get; set; }
        public int MonthlyOrdersCount { get; set; }
        public int DailyOrderCount { get; set; }
        public int WeeklyOrderCount { get; set; }
        public int UserCount { get; set; }
    }
}
