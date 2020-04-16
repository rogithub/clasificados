using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace Clasificados.Controllers
{
    public class HomeController : BaseController
    {


        public HomeController(ILogger logger) : base(logger)
        {

        }

        public IActionResult Index()
        {
            Logger.Information("Home Visited");
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
