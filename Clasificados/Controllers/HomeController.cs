using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;

namespace Clasificados.Controllers
{
    public class HomeController : BaseController
    {


        public HomeController(ILogger logger) : base(logger)
        {

        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Lugar()
        {
            return View();
        }

        public IActionResult Anunciar()
        {
            return View();
        }
    }
}
