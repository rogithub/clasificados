﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;

namespace Clasificados.Controllers
{
    public class HomeController : Controller
    {
        private ILogger Logger { get; set; }

        public HomeController(ILogger logger)
        {
            Logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Inmuebles()
        {
            return View();
        }
        public IActionResult Varios()
        {
            return View();
        }
        public IActionResult Vehiculos()
        {
            return View();
        }
        public IActionResult Empleos()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
