using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Oracle.Net.Models;

namespace Oracle.Net.Controllers
{
    public class AdminController : Controller
    {
        public Entities _connect;
        public AdminController()
        {
            _connect = new Entities();
        }
        // GET: Admin
        public ActionResult Index()
        {
            List<HANG> hang = _connect.HANGs.Select(p => p).ToList();
            return View();
        }
        public ActionResult ListSP()
        {
            List<HANG> hang = _connect.HANGs.Select(p => p).ToList();
            return View();
        }
        public JsonResult Load(int page, int pageSize = 5)
        {
            //if (LoginAdminController.session != null)
            //{
            //    string[] quyen = LoginAdminController.session;

            //    if (Convert.ToInt32(quyen[1]) > 2)
            //    {
            //        return Json(new { status = false }, JsonRequestBehavior.AllowGet);
            //    }
            //}

            var sanpham = _connect.SANPHAMs.Select(p => p).OrderByDescending(p => p.ID).ToList();
            var hang = _connect.HANGs.Select(p => p).ToList();
            var mau = _connect.MAUs.Select(p => p).ToList();
            var dungluong = _connect.DUNGLUONGs.Select(p => p).ToList();
            var loai = _connect.LOAIs.Select(p => p).ToList();
            var chitietsp = _connect.CHITIETSPs.Select(p => p).GroupBy(p=>p.IDSP).ToList();
            int totalRow = sanpham.Count;
            var model = sanpham.Skip((page - 1) * pageSize).Take(pageSize);
            return Json(new { data = model, status = true, rowcount = totalRow }, JsonRequestBehavior.AllowGet);

        }
    }
}