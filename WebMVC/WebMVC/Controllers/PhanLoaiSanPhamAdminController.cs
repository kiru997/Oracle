using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMVC.Models;
namespace WebMVC.Controllers
{
    public class PhanLoaiSanPhamAdminController : Controller
    {
        //
        // GET: /PhanLoaiSanPham/
        private AppleEntities _connect;
        public PhanLoaiSanPhamAdminController()
        {
            _connect = new AppleEntities();
            _connect.Configuration.ProxyCreationEnabled = false;
        }
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Load()
        {
            if (LoginAdminController.session != null)
            {
                string[] quyen = LoginAdminController.session;

                if (Convert.ToInt32(quyen[1]) > 2)
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }
            }
            var mau = _connect.MAUs.Select(p => p).ToList();
            var hang = _connect.HANGs.Select(p => p).ToList();
            var loai = _connect.LOAIs.Select(p => p).ToList();
            return Json(new { mau = mau, hang = hang, loai = loai,status=true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Save(int id,string flag,string value)
        {
            
            if(flag=="mau")
            {
                MAU mau = _connect.MAUs.SingleOrDefault(p => p.ID == id);
                mau.MAUSP = value;
                
            }
            if(flag=="hang")
            {
                HANG hang = _connect.HANGs.SingleOrDefault(p => p.ID == id);
                hang.HANGSX = value;
            }
            if(flag=="loai")
            {
                LOAI loai = _connect.LOAIs.SingleOrDefault(p => p.ID == id);
                loai.LOAISP = value;
            }
            _connect.SaveChanges();
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Add(string flag,string value)
        {
            if (flag == "mau")
            {
                MAU mau = new MAU();
                mau.MAUSP = value;
                _connect.MAUs.Add(mau);

            }
            if (flag == "hang")
            {
                HANG hang = new HANG();
                hang.HANGSX = value;
                _connect.HANGs.Add(hang);
            }
            if (flag == "loai")
            {
                LOAI loai = new LOAI();
                loai.LOAISP = value;
                _connect.LOAIs.Add(loai);
            }
            
            _connect.SaveChanges();
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int id,string flag)
        {
            if (flag == "mau")
            {
                MAU mau = _connect.MAUs.SingleOrDefault(p => p.ID == id);

                _connect.MAUs.Remove(mau);

            }
            if (flag == "hang")
            {
                HANG hang = _connect.HANGs.SingleOrDefault(p => p.ID == id);

                _connect.HANGs.Remove(hang);
            }
            if (flag == "loai")
            {
                LOAI loai = _connect.LOAIs.SingleOrDefault(p => p.ID == id);
                _connect.LOAIs.Remove(loai);
            }
            _connect.SaveChanges();
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
	}
}