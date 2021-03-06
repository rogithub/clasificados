using Serilog;
using AutoMapper;
using Repositories;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;

namespace Clasificados.Controllers
{
    [ApiController]
    public class ApiInmueblesController : ApiBaseController<Entities.Inmueble, Models.Inmueble>
    {

        public ApiInmueblesController(ILogger logger,
            IBaseRepo<Entities.Inmueble> repo,
            IMapper mapper,
            LinkGenerator linkGen) :
         base(logger, repo, mapper, linkGen)
        {

        }
    }
}
