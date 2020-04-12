using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;
using Clasificados.Filters;

namespace Clasificados.Controllers
{
    public class InmueblesController : Controller
    {
        private ILogger Logger { get; set; }

        public InmueblesController(ILogger logger)
        {
            Logger = logger;
        }
        [RedirectSinLugar]
        public IActionResult Index()
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
