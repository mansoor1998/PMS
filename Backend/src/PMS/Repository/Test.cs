using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Repository
{
    public class Test : TestAbstract
    {
        public override void Function()
        {
            Console.WriteLine("value is abstracted");
        }
    }
}
