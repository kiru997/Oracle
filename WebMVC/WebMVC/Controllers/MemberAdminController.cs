using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMVC.Models;

namespace WebMVC.Controllers
{
    public  class MemberAdminController : Controller
    {
        //
        // GET: /MemberAdmin/
        private AppleEntities _connect;
        public MemberAdminController()
        {
            _connect = new AppleEntities();

         
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
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Load(int page,int pageSize=5)
        {
            if (LoginAdminController.session != null)
            {
                string[] quyen = LoginAdminController.session;

                if (Convert.ToInt32(quyen[1]) > 1)
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }
            }
            var member = _connect.MEMBERs.Select(p => p).OrderByDescending(p => p.ID).ToList();
            int totalRow = member.Count;
            var model = member.Skip((page - 1) * pageSize).Take(pageSize);
            return Json(new { data = model, status = true, rowcount = totalRow }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            MEMBER member = _connect.MEMBERs.SingleOrDefault(p => p.ID == id);
            _connect.MEMBERs.Remove(member);
            _connect.SaveChanges();
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetail(int id)
        {
            MEMBER member = _connect.MEMBERs.SingleOrDefault(p => p.ID == id);
            return Json(new {   data=member, status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Save(int? id,string data,bool isadd)
        {
            if(isadd==true)
            {
                JavaScriptSerializer serialzer = new JavaScriptSerializer();
                MEMBER member = serialzer.Deserialize<MEMBER>(data);
                member.MATKHAU = md5(member.MATKHAU);
              
                _connect.MEMBERs.Add(member);
                _connect.SaveChanges(); 
                
                
            }
            else
            {
                MEMBER mb = _connect.MEMBERs.SingleOrDefault(p => p.ID == id);
                JavaScriptSerializer serialzer = new JavaScriptSerializer();
                MEMBER members = serialzer.Deserialize<MEMBER>(data);
                mb.TEN = members.TEN;
                mb.MATKHAU = md5(members.MATKHAU);
                mb.ANH = members.ANH;
                mb.EMAIL = members.EMAIL;
                mb.QUYEN = members.QUYEN;
                mb.SDT = members.SDT;
                mb.STATUS = members.STATUS;
                _connect.SaveChanges();

            }
            
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
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