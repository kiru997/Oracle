using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebMVC.Models;

namespace WebMVC.Models
{
    public class MultiModel
    {
        private AppleEntities _connect;
        public MultiModel()
        {
            _connect = new AppleEntities();
        }
        public List<HANG> ListHang
        {
            get{ return _connect.HANGs.Select(p => p).ToList(); }
            set{ }
            
        }
        public List<MAU> ListMau
        {
            get { return _connect.MAUs.Select(p => p).ToList(); }
            set { }

        }
        public List<LOAI> ListLoai
        {
            get { return _connect.LOAIs.Select(p => p).ToList(); }
            set { }

        }
    }
}