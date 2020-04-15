using Serilog;
using AutoMapper;
using Repositories;
using Microsoft.AspNetCore.Routing;

namespace Clasificados.Controllers
{
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
