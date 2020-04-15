using Microsoft.AspNetCore.Mvc;
using Serilog;
using Repositories;
using System.Linq;
using System.Collections.Generic;
using Entities;

namespace Clasificados.Controllers
{
    [Route("[controller]")]
    public class ApiLugaresController : BaseController
    {

        private IEstadosRepo EstadosRepo { get; set; }
        private ICiudadesRepo CiudadesRepo { get; set; }
        public ApiLugaresController(ILogger logger, IEstadosRepo estadosRepo, ICiudadesRepo ciudadesRepo) : base(logger)
        {
            EstadosRepo = estadosRepo;
            CiudadesRepo = ciudadesRepo;
        }

        private IEnumerable<Estado> GetLugares()
        {
            var edos = EstadosRepo.GetAll();
            var ciudades = CiudadesRepo.GetAll();
            foreach (var e in edos)
            {
                e.Ciudades = ciudades.Where(c => c.EstadoId == e.Id).ToArray();
            }
            return (from e in edos where e.Ciudades.Length > 0 select e);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var estados = GetLugares();

            var ciudad = estados
            .SelectMany(e => e.Ciudades)
            .FirstOrDefault(c => c.Id == base.CiudadId);

            if (ciudad == null)
            {
                return null;
            }

            var estado = estados.FirstOrDefault(e => e.Id == ciudad.EstadoId);

            return Json(new { Estado = estado, Ciudad = ciudad });
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            return Json(GetLugares());
        }

        [HttpPost("{id:int}")]
        [Route("save/{id}")]
        public IActionResult Save(int id)
        {
            base.CiudadId = id;
            return Json(id);
        }
    }
}
