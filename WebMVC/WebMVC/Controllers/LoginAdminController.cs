using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMVC.Models;
using System.Security;

namespace WebMVC.Controllers
{
    public  class LoginAdminController : Controller
    {
        //
        // GET: /LoginAdmin/k sta
        private AppleEntities _connect;
        public static string[] session { set; get; }
        public static byte[] encryptData(string data)
        {
            System.Security.Cryptography.MD5CryptoServiceProvider md5Hasher = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] hashedBytes;
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            hashedBytes = md5Hasher.ComputeHash(encoder.GetBytes(data));
            return hashedBytes;
        }
        public static string md5(string data)
        {
            return BitConverter.ToString(encryptData(data)).Replace("-", "").ToLower();
        }
        public LoginAdminController()
        {
            _connect = new AppleEntities();
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public JsonResult IsAdmin(string user,string pass)
        {
            string pass1 = md5(pass);
            MEMBER member = _connect.MEMBERs.SingleOrDefault(p => p.TAIKHOAN == user && p.MATKHAU==pass1 && p.QUYEN>0);
            if (member != null)
            {

                string[] userdetail = new string[2];
                userdetail[0] = member.TAIKHOAN;
                userdetail[1] = member.QUYEN.ToString();
                Session["authen"] = userdetail;
                session = (string[])Session["authen"];
                //return RedirectToAction("Index", "SanPhamAdmin");
                return Json(new { Url = "/SanPhamAdmin/Index", status = true }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                
                return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                
            }
            
        }
        [HttpPost]
        public JsonResult Protect()
        {
            if(session==null)
            {
                return Json(new { Url = "/LoginAdmin/Login", status = true }, JsonRequestBehavior.AllowGet);
            }
            else
            {

                return Json(new { status = false }, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult GetDetail()
        {
            if(Session["authen"]!=null)
            {
                string[] detail = (string[])Session["authen"];
                string user = detail[0];
                MEMBER member = _connect.MEMBERs.SingleOrDefault(p => p.TAIKHOAN == user);
                string ava = member.ANH;
                return Json(new { ava = ava, username = member.TAIKHOAN, status = true }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Logout()
        {
            Session.RemoveAll();
            session = new string[2];
            return RedirectToAction("Login","LoginAdmin");
        }
            

	}
}