using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;

namespace Clasificados.Controllers
{
    [Route("[controller]")]
    public class LugaresController : BaseController
    {


        public LugaresController(ILogger logger) : base(logger)
        {

        }

        [HttpGet]
        public IActionResult Get()
        {
            Lugar model = new Lugar();
            model.Estado = base.Estado;
            model.Ciudad = base.Ciudad;
            return Json(model);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Lugar model)
        {
            base.Estado = model.Estado;
            base.Ciudad = model.Ciudad;
            return Json(model);
        }
    }
}
