using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Filters;

namespace Clasificados.Controllers
{
    public class VariosController : BaseController
    {
        public VariosController(ILogger logger) : base(logger)
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
