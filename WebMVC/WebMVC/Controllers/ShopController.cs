using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMVC.Models;
using System.Web.UI.WebControls;
namespace WebMVC.Controllers
{
    public class ShopController : Controller
    {
        //
        // GET: /Shop/
        private AppleEntities _connect;
        public ShopController()
        {
            _connect = new AppleEntities();
            _connect.Configuration.ProxyCreationEnabled = false;
        }
        public ActionResult Full()
        {
            return View();
        }
        public ActionResult Ship()
        {
            return View();
        }
        public JsonResult Load(int page,int pageSize=5)
        {
            
                var fulllist=_connect.DONHANGs.Select(p=>p).OrderByDescending(p=>p.STASTUS).OrderBy(p=>p.THANHTOAN).OrderByDescending(p=>p.ID).ToList();
                int totalRow = fulllist.Count;
                var model = fulllist.Skip((page - 1) * pageSize).Take(pageSize);               
                return Json(new { full = model, status = true, rowcount=totalRow}, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadShip(int page, int pageSize = 5)
        {

            var ship = _connect.SHIPs.Select(p => p).OrderByDescending(p => p.ID).ToList();
            int totalship = ship.Count;
            var takeship = ship.Skip((page - 1) * pageSize).Take(pageSize);
            return Json(new { status = true, takeship = takeship, totalship = totalship }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            DONHANG donhang = _connect.DONHANGs.SingleOrDefault(p => p.ID == id);
            _connect.DONHANGs.Remove(donhang);
            _connect.SaveChanges();
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult DeleteShip(int id)
        {
            SHIP ship = _connect.SHIPs.SingleOrDefault(p => p.ID == id);
            _connect.SHIPs.Remove(ship);
            _connect.SaveChanges();
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetDetail(int id)
        {
            SHIP ship = _connect.SHIPs.SingleOrDefault(p => p.ID == id);
         
            return Json(new {data=ship, status = true }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConfirmOrPaid(int id,bool flag)
        {
            
            
            DONHANG donhang = _connect.DONHANGs.SingleOrDefault(p => p.ID == id);
            if (flag == true)
                donhang.STASTUS = 1;
            else
                donhang.THANHTOAN = 1;
            _connect.SaveChanges();
            return Json(new {status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Save(string strship,int id)
        {
            SHIP ship = _connect.SHIPs.SingleOrDefault(p => p.ID == id);
            JavaScriptSerializer serialzer = new JavaScriptSerializer();
            SHIP sp = serialzer.Deserialize<SHIP>(strship);
            ship.NAME = sp.NAME;
            ship.LASTNAME = sp.LASTNAME;
            ship.ADDRESS = sp.ADDRESS;
            ship.NOTES = sp.NOTES;
            ship.PHONE = sp.PHONE;
            _connect.SaveChanges();
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Book(int id,string ship,int soluong)
        {
            SANPHAM sanphams = _connect.SANPHAMs.SingleOrDefault(p => p.ID == id);
            if (sanphams.SOLUONGDAT == null)
                sanphams.SOLUONGDAT = soluong;
            else
                sanphams.SOLUONGDAT = sanphams.SOLUONGDAT + soluong;
            JavaScriptSerializer serialzer = new JavaScriptSerializer();
            SHIP sp = serialzer.Deserialize<SHIP>(ship);
            
            _connect.SHIPs.Add(sp);
            _connect.SaveChanges();
            var arrlast = _connect.SHIPs.Select(p => p).OrderByDescending(p => p.ID).ToArray();
            var last = arrlast[0];
            DONHANG donhang = new DONHANG();
            donhang.IDSHIP = (long)last.ID;
            donhang.IDSP = id.ToString() + "x" + soluong.ToString();
            donhang.NGAYDAT = DateTime.Now;
            donhang.TONGTIEN = ((Int32)sanphams.GIA - (Int32)(sanphams.GIA * sanphams.SALE / 100))*soluong;
            _connect.DONHANGs.Add(donhang);
            _connect.SaveChanges();
            
            
           
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
	}
}