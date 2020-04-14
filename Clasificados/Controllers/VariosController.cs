using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Filters;
using AutoMapper;
using Repositories;
using System.Linq;
using System;
using Entities;
using Microsoft.AspNetCore.Routing;

namespace Clasificados.Controllers
{
    public class VariosController : ApiBaseController<Entities.Varios, Models.Varios>
    {
        public VariosController(ILogger logger,
            IBaseRepo<Entities.Varios> repo,
            IMapper mapper,
            LinkGenerator linkGen) : 
         base(logger, repo, mapper, linkGen)
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
