﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Keybo_2.Controllers
    {
    public class HomeController : Controller
        {
        public ActionResult Index()
            {
            return View();
            }

        public ActionResult Learning()
            {
            return View();
            }

        public ActionResult PersonalPage()
            {
            ViewBag.Message = "Your application description page.";

            return View();
            }

        public ActionResult Rating()
            {
            ViewBag.Message = "Your contact page.";

            return View();
            }

        public ActionResult Keybo()
            {
            ViewBag.Message = "Keybo";
            return View();
            }
        }
    }