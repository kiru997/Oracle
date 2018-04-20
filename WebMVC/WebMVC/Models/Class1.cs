using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC.Models
{
    public class HomeView
    {
        private AppleEntities data = new AppleEntities();
        public List<SANPHAM> listsp { set { } get { return data.SANPHAMs.Select(p => p).ToList(); } }
        public List<HANG> listhang { set { } get { return data.HANGs.Select(p => p).ToList(); } }
        public List<SANPHAM> listtopsp { set { } get { return data.SANPHAMs.Select(p => p).Take(10).ToList(); } }
        public int? hang1 { set; get; }
          public List<SANPHAM> listsx { set { } get { return data.SANPHAMs.Where(p=>p.HANG == this.hang1).ToList(); } }
    }
    public class viewCart 
    {
        public SANPHAM sp { set; get; }
        public MEMBER mem { set; get; }
        public int soluong { set; get; }
    }
}