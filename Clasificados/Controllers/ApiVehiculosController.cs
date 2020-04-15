using Serilog;
using AutoMapper;
using Repositories;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;

namespace Clasificados.Controllers
{
    [ApiController]
    public class ApiVehiculos : ApiBaseController<Entities.Vehiculo, Models.Vehiculo>
    {
        public ApiVehiculos(ILogger logger,
            IBaseRepo<Entities.Vehiculo> repo,
            IMapper mapper,
            LinkGenerator linkGen) :
         base(logger, repo, mapper, linkGen)
        {

        }
    }
}
