using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Repositories;
using Serilog;

namespace Clasificados.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public abstract class ApiBaseController<TEntity, TModel>
    : BaseController
    where TEntity : ILongId, IFecha
    where TModel : ILongId, IFecha
    {
        protected IBaseRepo<TEntity> Repo { get; }
        protected IMapper Mapper { get; }
        protected LinkGenerator LinkGen { get; }

        public ApiBaseController(
            ILogger logger,
            IBaseRepo<TEntity> repo,
            IMapper mapper,
            LinkGenerator linkGen) : base(logger)
        {
            Repo = repo;
            Mapper = mapper;
            LinkGen = linkGen;
        }

        [HttpGet("{id:long}")]
        [Route("getFolio/{id}")]
        public async Task<ActionResult<TModel>> GetFolio(Int64 id)
        {
            var entity = await Repo.Get(id).FirstOrDefaultAsync();
            if (entity == null) return NotFound();

            return Mapper.Map<TModel>(entity);
        }

        [Route("search")]
        [HttpPost()]
        public async Task<ActionResult<Resultset<IEnumerable<TModel>>>> Search
        ([FromBody] Models.SearchData model)
        {
            var entity = Mapper.Map<Entities.SearchData>(model);
            var rs = Repo.Search(entity).ToAsyncEnumerable();
            var list = new List<TModel>();
            Int64 rowCount = 0;

            await foreach (var item in rs)
            {
                list.Add(Mapper.Map<TModel>(item.Payload));
                rowCount = item.TotalRows;
            }

            var result = new Resultset<IEnumerable<TModel>>(rowCount, list);

            return Ok(result);
        }

        [Route("save")]
        [HttpPost()]
        public async Task<ActionResult<TModel>> Save([FromBody] TModel model)
        {
            model.Id = 0;
            model.Fecha = DateTime.Now;

            var item = Mapper.Map<TModel, TEntity>(model);
            var affectedRows = await Repo.Save(item);
            if (affectedRows > 0)
            {
                var controller = this.ControllerContext.RouteData.Values["controller"].ToString();
                controller = controller
                .Replace("controller", string.Empty, System.StringComparison.InvariantCultureIgnoreCase)
                .Replace("api", string.Empty, System.StringComparison.InvariantCultureIgnoreCase);

                var location = LinkGen.GetPathByAction("Index", controller);
                return Created(location, Mapper.Map<TModel>(item));
            }

            return BadRequest();
        }

        [HttpPut()]
        public async Task<ActionResult<int>> Put([FromBody] TModel model)
        {
            var entity = await Repo.Get(model.Id).FirstOrDefaultAsync();
            if (entity == null) return NotFound();

            var item = Mapper.Map<TModel, TEntity>(model);
            var affectedRows = await Repo.Update(item);
            if (affectedRows > 0)
            {
                return affectedRows;
            }

            return BadRequest();
        }

        [HttpDelete("{id:long}")]
        [Route("delete/{id}")]
        public async Task<ActionResult<int>> Delete(Int64 id)
        {
            var item = await Repo.Get(id).FirstOrDefaultAsync();
            if (item == null) return NotFound();

            var affectedRows = await Repo.Delete(id);
            if (affectedRows > 0)
            {
                return affectedRows;
            }

            return BadRequest();
        }
    }
}
