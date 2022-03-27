using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Dto.User
{
    public class ChangePassword
    {
        public string NewPassword { get; set; }
        public string PreviousPassword { get; set; }

    }
}
