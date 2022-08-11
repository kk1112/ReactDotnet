using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactDotnet.Controllers
{
    public class StudentMasterController : Controller
    {
        // GET: StudentMaster
        CrudDemoEntities1 db = new CrudDemoEntities1();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult StudentList()
        {
            var lstStudent = db.studentmasters.ToList();
            return Json(new { StudentList = lstStudent }, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetById(int id)
        {
            var StudentInfo = db.studentmasters.Where(x => x.Id == id).SingleOrDefault();
            return Json(StudentInfo, JsonRequestBehavior.AllowGet);
        }
      public JsonResult RemoveStudent(int id)
        {
            var student = new studentmaster { Id = id };
            db.studentmasters.Attach(student);
            db.studentmasters.Remove(student);
            db.SaveChanges();
            return Json(new { status = "Success", Message = "Record Removed successfully!" }, JsonRequestBehavior.AllowGet);
        }  

        [HttpPost]
        public JsonResult AddEditStudent(studentmaster data)
        {
            try
            {
                if (data.Id == 0)
                {
                    studentmaster studentObj = new studentmaster();
                    studentObj.Name = data.Name;
                    studentObj.Class = data.Class;
                    studentObj.RollNo = data.RollNo;
                    studentObj.Address = data.Address;
                    db.studentmasters.Add(studentObj);
                    db.SaveChanges();
                    return Json(new { status = "Success", Message = "Record has been Saved" },JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var Obj = db.studentmasters.Where(x => x.Id == data.Id).SingleOrDefault();
                    if (Obj.Id > 0)
                    {
                        Obj.Name = data.Name;
                        Obj.RollNo = data.RollNo;
                        Obj.Class = data.Class;
                        Obj.Address = data.Address;
                        db.SaveChanges();
                        return Json(new { status = "Success", Message = "Record Updated Successfully!" }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            catch(Exception ex)
            {

            }
            return Json(new { status = "Error", Message = "Data not Save" });
        }
    }
}