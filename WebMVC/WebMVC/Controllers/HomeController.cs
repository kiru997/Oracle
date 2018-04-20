using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMVC.Models;
namespace WebMVC.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        private AppleEntities data = new AppleEntities();
        public ActionResult Index()
        {
            HomeView home = new HomeView();
            return View(home);
        }
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
        [HttpPost]
        public JsonResult signup()
        {
        
                string user = Request.Form["user"];
                MEMBER test = data.MEMBERs.Where(p => p.TAIKHOAN == user).SingleOrDefault();
                if (test == null)
                {
                    MEMBER mem = new MEMBER();
                    mem.MATKHAU = md5(Request.Form["pass"]);
                    mem.EMAIL = Request.Form["email"];
                    mem.TAIKHOAN = Request.Form["user"];
                    mem.STATUS = 0;
                    data.MEMBERs.Add(mem);

                    data.SaveChanges();
                    return Json(1);
                }
                else
                     return Json(2);
         
       
        }
        [HttpPost]
        public JsonResult savecart()
        {
            if (Request.Cookies["cart"] == null || Request.Cookies["soluong"] == null)
            {

                return Json(2);

            }
                string name = Request.Form["name"];
                string phone = Request.Form["phone"];
                string address = Request.Form["address"];
                string note = Request.Form["note"];
                SHIP ship = new SHIP();
                ship.NAME = name;
                ship.PHONE = phone;
                ship.NOTES = note;
                ship.ADDRESS = address;
                data.SHIPs.Add(ship);
                data.SaveChanges();
                DONHANG don = new DONHANG();
                don.IDSHIP = (long)ship.ID;
                don.TONGTIEN =(int?)Convert.ToDouble( Request.Form["tong"]) ;
                don.IDUSER = Convert.ToInt32((string)Session["auth"]);
                var tmpids = Request.Cookies["cart"].Value.Split(',');
                don.NGAYDAT = DateTime.Now;
              
                var tmpsoluong = Request.Cookies["soluong"].Value.Split(',');
                string heo = "";
                for (int i = 0; i < tmpids.Length; ++i)
                {
                    heo = heo + tmpids[i] + "x" + tmpsoluong[i] + ",";
                }
                don.IDSP = heo.Trim(',');
                don.STASTUS = 0;
                don.THANHTOAN = 0;
                data.DONHANGs.Add(don);
                data.SaveChanges();
               
                    Response.Cookies["cart"].Expires = DateTime.Now.AddDays(-1);
                    Response.Cookies["soluong"].Expires = DateTime.Now.AddDays(-1);
           

     
                return Json(1);
     
           
           
            
        }
        [HttpPost]
        public JsonResult search()
        {
       
            string value = Request.Form["value"];
            var   sanphams = data.SANPHAMs.Where(p => p.TENSP.Contains(value)).ToList();
          
            return Json(sanphams, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult updatesoluong()
        {
            Response.Cookies["soluong"].Value = Request.Form["soluong"];
            return Json(1);
        }
        [HttpGet]
        public ActionResult Productsx()
        {
            
            int? hang = (int?)Convert.ToInt32(Request.QueryString["hang"]);
            HomeView sanpham = new HomeView();
            sanpham.hang1 = hang;
          
            
            return View(sanpham);
        }
        public ActionResult cart()
        {
            List<viewCart> list = new List<viewCart>();
            if (Session["auth"] != null)
            {
                int g = Convert.ToInt32((string)Session["auth"]);
                MEMBER coc = data.MEMBERs.Where(p => p.ID == g).SingleOrDefault();
                if (coc != null)
                {
                    ViewBag.ten = coc.TEN;
                    ViewBag.sdt = coc.SDT;
                    ViewBag.email = coc.EMAIL;
                   
                }
                ViewBag.status = "1";
            }
            else
            {
                ViewBag.status = "0";
            }
            if (Request.Cookies["cart"] == null || Request.Cookies["soluong"] == null)
            {
                Response.Cookies["cart"].Expires = DateTime.Now.AddDays(-1);
                Response.Cookies["soluong"].Expires = DateTime.Now.AddDays(-1);
                return View(list);

            }
            if (Request.Cookies["cart"] != null)
            {
                if (Request.Cookies["cart"].Value != "")
                {
                    var ids = Request.Cookies["cart"].Value.Split(',');
                    var soluongs = Request.Cookies["soluong"].Value.Split(',');
                    for (int i = 0; i < ids.Length; ++i)
                    {
                    
                        viewCart tmp = new viewCart();
           
                        int tmpid = Convert.ToInt32(ids[i]);
                        tmp.sp = data.SANPHAMs.Where(p => p.ID == tmpid).SingleOrDefault();
                        tmp.soluong = Convert.ToInt32(soluongs[i]);
                        list.Add(tmp);
                      
                    }
                }
            }


           
          
            return View(list);
        }
        public JsonResult getacc()
        {
            if (Session["auth"] != null)
            {
                int id = Convert.ToInt32((string)Session["auth"]);
                return Json(data.MEMBERs.Where(p=>p.ID == id ).SingleOrDefault().TAIKHOAN);

            }
            return Json(1);
        }
        public ActionResult Product()
        {
            HomeView home = new HomeView();
            return View(home);
        }
        public ActionResult ProductDetail()
        {
             int id =Convert.ToInt32(Request.QueryString["id"]);
             var sanpham = data.SANPHAMs.Where(p => p.ID== id).FirstOrDefault();
             if (sanpham == null)
             {
                 return Redirect("Product");
             }

            return View(sanpham);
        }
        public ActionResult Checkout()
        {
            
            return View();
        }
        [HttpPost]
        public JsonResult Login()
        {
            try
            {
                string user = Request.Form["user"];
                string pass = md5(Request.Form["pass"]);
                MEMBER mem = data.MEMBERs.Where(p => p.TAIKHOAN ==  user && p.MATKHAU == pass ).SingleOrDefault();
                if (mem != null)
                {
                    Session["auth"] = mem.ID.ToString();
                    return Json(mem);
                }
                return Json(1);
            }
            catch(Exception e)
            {
               return Json(e.Message);
            }
            
        }
        [HttpPost]
        public JsonResult deletecart()
        {
            string tmpcart = "";
            string tmpsoluong = "";
            var ids = Request.Cookies["cart"].Value.Split(',');
            var soluongs = Request.Cookies["soluong"].Value.Split(',');
            for (int i = 0; i < ids.Length; ++i)
            {

                if (ids[i] != Request.Form["id"])
                {
                   
                    if (i < ids.Length-1)
                    {
                        tmpcart = tmpcart+ ids[i] + ",";
                        tmpsoluong = tmpsoluong + soluongs[i] + ",";
                    }
                    else
                    {
                        tmpsoluong = tmpsoluong + soluongs[i];
                        tmpcart = tmpcart + ids[i];
                    }
                }


            }
            Response.Cookies["cart"].Value = tmpcart.Trim(',');
            Response.Cookies["soluong"].Value = tmpsoluong.Trim(',');

            return Json(Request.Cookies["cart"].Value);
        }
        private int checkcart(string tmp) { 
            var ids = Request.Cookies["cart"].Value.Split(',');
            for (int i = 0; i < ids.Length; ++i)
            {
                if (tmp == ids[i])
                {
                    return i;
                }
            }
            return -1;
        }
        [HttpPost]
        public JsonResult addcart(int id )
        {
            int soluong = 0;
            if (Request.Form["soluong"] == "0")
            {
                soluong = 1;
            }
            else
            {
                soluong = Convert.ToInt32( Request.Form["soluong"]);
            }
            if(Request.Cookies["cart"]!=null){
                        if (checkcart(id.ToString()) != -1)
                        {
                            var soluongs = Request.Cookies["soluong"].Value.Split(',');
                            string tmp = "";
                            for (int i = 0; i < soluongs.Length; ++i)
                            {
                                string mang = soluongs[i];
                                if (i == checkcart(id.ToString()))
                                {
                                    if (soluong==1)
                                          mang = (Convert.ToInt32(mang) + soluong).ToString();
                                    else
                                          mang = (soluong).ToString();
                                }
                                if (i != 0)
                                    tmp = tmp + "," + mang;
                                else
                                    tmp = mang;
                            }
                            Response.Cookies["soluong"].Value = tmp.Trim(',');
                            return Json(Request.Cookies["soluong"].Value);
                        }
            }


            if (Request.Cookies["cart"] == null || Request.Cookies["cart"].Value == "")
            {
                Response.Cookies["cart"].Value = id.ToString();
                if (Request.Form["soluong"] != "0")
                {
                    if (Request.Cookies["soluong"] == null || Request.Cookies["soluong"].Value == "")
                        Response.Cookies["soluong"].Value = Request.Form["soluong"];
                    else
                        Response.Cookies["soluong"].Value = Request.Cookies["soluong"].Value + "," + Request.Form["soluong"];
                }
                else
                {
                    if (Request.Cookies["soluong"] == null || Request.Cookies["soluong"].Value == "")
                        Response.Cookies["soluong"].Value = "1";
                    else
                        Response.Cookies["soluong"].Value = Request.Cookies["soluong"].Value + "," + "1";
                }
            }
            else
            {
                Response.Cookies["cart"].Value = Request.Cookies["cart"].Value + "," + id.ToString();
                if (Request.Form["soluong"] != "0")
                {
                    if (Request.Cookies["soluong"] == null || Request.Cookies["soluong"].Value == "")
                        Response.Cookies["soluong"].Value = Request.Form["soluong"];
                    else
                        Response.Cookies["soluong"].Value = Request.Cookies["soluong"].Value + "," + Request.Form["soluong"];
                }
                else
                {
                    if (Request.Cookies["soluong"] == null || Request.Cookies["soluong"].Value == "")
                        Response.Cookies["soluong"].Value = "1";
                    else
                        Response.Cookies["soluong"].Value = Request.Cookies["soluong"].Value + "," + "1";
                }
                   
            }
         
          
            Response.Cookies["cart"].Expires = DateTime.Now.AddDays(1);
            Response.Cookies["soluong"].Expires = DateTime.Now.AddDays(1);

            return Json(Request.Cookies["soluong"].Value);
        }
        
    }
}