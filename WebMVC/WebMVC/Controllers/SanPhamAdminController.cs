using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMVC.Models;

namespace WebMVC.Controllers
{
    public class SanPhamAdminController : Controller
    {
        //
        // GET: /SanPhamAdmin/
        private AppleEntities _connect;
        public SanPhamAdminController()
        {
            _connect = new AppleEntities();
            _connect.Configuration.ProxyCreationEnabled = false;
        }
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult Load(int page, int pageSize = 5)
        {
            if(LoginAdminController.session!=null)
            {
                string[] quyen = LoginAdminController.session;

                if (Convert.ToInt32(quyen[1]) > 2)
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }
            }
           
            var sanpham = _connect.SANPHAMs.Select(p => p).OrderByDescending(p => p.ID).ToList();
            int totalRow = sanpham.Count;
            var model = sanpham.Skip((page - 1) * pageSize).Take(pageSize);
            return Json(new { data = model, status = true, rowcount = totalRow }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadHangLoaiMau()
        {
            var mau = _connect.MAUs.Select(p => p).ToList();
            var loai = _connect.LOAIs.Select(p => p).ToList();
            var hang = _connect.HANGs.Select(p => p).ToList();
            return Json(new { hang = hang, loai = loai, mau = mau, status = true }, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            if ( id > 0)
            {
                var sanpham = _connect.SANPHAMs.SingleOrDefault(p => p.ID == id);
                if (sanpham != null)
                {
                    _connect.SANPHAMs.Remove(sanpham);
                    _connect.SaveChanges();
                }
            }


            return Json(new { status = true });
        }
        [HttpPost]
        public JsonResult Save(string sanpham, int? id, bool isadd)
        {
            if (isadd == true)
            {
                JavaScriptSerializer serialzer = new JavaScriptSerializer();
                SANPHAM sanphams = serialzer.Deserialize<SANPHAM>(sanpham);
                _connect.SANPHAMs.Add(sanphams);
                _connect.SaveChanges();
            }
            else
            {
                if (id != null)
                {
                    SANPHAM sp = _connect.SANPHAMs.SingleOrDefault(p => p.ID == id);
                    JavaScriptSerializer serialzer = new JavaScriptSerializer();
                    SANPHAM sanphams = serialzer.Deserialize<SANPHAM>(sanpham);
                    sp.ANHIEN = sanphams.ANHIEN;
                    sp.DUNGLUONG = sanphams.DUNGLUONG;
                    sp.GIA = sanphams.GIA;
                    sp.HANG = sanphams.HANG;
                    sp.LOAI = sanphams.LOAI;
                    sp.SALE = sanphams.SALE;
                    sp.SOLUONG = sanphams.SOLUONG;
                    sp.TENSP = sanphams.TENSP;
                    sp.THONGSO = sanphams.THONGSO;
                    sp.THONGTIN = sanphams.THONGTIN;
                    sp.TINHTRANG = sanphams.TINHTRANG;
                    sp.MAU = sanphams.MAU;                  
                    if (sanphams.ANHBIA!="")
                        sp.ANHBIA = sanphams.ANHBIA;
                    if (sanphams.ANHFULL!="")
                        sp.ANHFULL = sanphams.ANHFULL;
                    _connect.SaveChanges();
                }
            }

            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetail(int id)
        {
            SANPHAM sanpham = _connect.SANPHAMs.SingleOrDefault(p => p.ID == id);

            return Json(new { data = sanpham, status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UploadFile()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;
                        //string full_filename = Server.MapPath("~/Container/Image" + file.FileName);
                        //file.SaveAs(full_filename);

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        // Get the complete folder path and store the file inside it.  
                        fname = Path.Combine(Server.MapPath("~/Container/Image"), fname);
                        file.SaveAs(fname);
                    }
                    // Returns message that successfully uploaded  
                    return Json(new { status=true},JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json(new { status = false }, JsonRequestBehavior.AllowGet);
            }  
            
            

           
        }
        [HttpPost]
        public ActionResult UploadFileFull()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;
                        //string full_filename = Server.MapPath("~/Container/Image" + file.FileName);
                        //file.SaveAs(full_filename);

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        // Get the complete folder path and store the file inside it.  
                        fname = Path.Combine(Server.MapPath("~/Container/Image"), fname);
                        file.SaveAs(fname);
                    }
                    // Returns message that successfully uploaded  
                    return Json(new { status = true }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json(new { status = false }, JsonRequestBehavior.AllowGet);
            }  
            
            

           
        }
    
    }  
}