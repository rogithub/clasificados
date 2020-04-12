using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;
using Clasificados.Filters;

namespace Clasificados.Controllers
{
    public class VehiculosController : BaseController
    {

        public VehiculosController(ILogger logger) : base(logger)
        {
        }
        [RedirectSinLugar]
        public IActionResult Index()
        {
            return View();
        }
    }
}