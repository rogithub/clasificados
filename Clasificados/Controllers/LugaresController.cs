using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;
using Repositories;
using System.Linq;

namespace Clasificados.Controllers
{
    [Route("[controller]")]
    public class LugaresController : BaseController
    {

        private IEstadosRepo EstadosRepo { get; set; }
        private ICiudadesRepo CiudadesRepo { get; set; }
        public LugaresController(ILogger logger, IEstadosRepo estadosRepo, ICiudadesRepo ciudadesRepo) : base(logger)
        {
            EstadosRepo = estadosRepo;
            CiudadesRepo = ciudadesRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var edos = EstadosRepo.GetAll();
            var ciudades = CiudadesRepo.GetAll();
            foreach (var e in edos)
            {
                e.Ciudades = ciudades.Where(c => c.EstadoId == e.Id).ToArray();
            }
            return Json(edos);
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
