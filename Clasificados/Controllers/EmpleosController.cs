using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;
using Clasificados.Filters;

namespace Clasificados.Controllers
{
    public class EmpleosController : BaseController
    {

        public EmpleosController(ILogger logger) : base(logger)
        {

        }

        [RedirectSinLugar]
        public IActionResult Index()
        {
            ViewBag.CiudadId = base.CiudadId;
            return View();
        }
    }
}
