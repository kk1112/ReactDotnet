using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactDotnet.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        CrudDemoEntities1 db = new  CrudDemoEntities1();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetMenulist()
        {
            var menuList = db.MainMenus.Select(m => new
            {
                m.Name,
                m.Url
                ,
                SubMenu = m.SubMenus.Select(sm => new
                {
                    sm.SubName,
                    sm.SubUrl
                })
            }).ToList();
            return Json(menuList, JsonRequestBehavior.AllowGet);
        }
    }
}