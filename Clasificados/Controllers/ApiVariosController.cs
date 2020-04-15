using Serilog;
using AutoMapper;
using Repositories;
using Microsoft.AspNetCore.Routing;

namespace Clasificados.Controllers
{
    public class ApiVariosController : ApiBaseController<Entities.Varios, Models.Varios>
    {
        public ApiVariosController(ILogger logger,
            IBaseRepo<Entities.Varios> repo,
            IMapper mapper,
            LinkGenerator linkGen) :
         base(logger, repo, mapper, linkGen)
        {

        }
    }
}
