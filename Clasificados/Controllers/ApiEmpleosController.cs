using Serilog;
using AutoMapper;
using Repositories;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;

namespace Clasificados.Controllers
{
    [ApiController]
    public class ApiEmpleosController : ApiBaseController<Entities.Empleo, Models.Empleo>
    {
        public ApiEmpleosController(ILogger logger,
            IBaseRepo<Entities.Empleo> repo,
            IMapper mapper,
            LinkGenerator linkGen) :
         base(logger, repo, mapper, linkGen)
        {

        }
    }
}
