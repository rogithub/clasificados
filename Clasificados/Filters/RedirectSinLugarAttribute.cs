using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;

namespace Clasificados.Filters
{
    public class RedirectSinLugarAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.Controller is BaseController)
            {
                BaseController controller = context.Controller as BaseController;

                long ciudad = controller.CiudadId;

                if (ciudad == -1)
                {
                    var url = new RouteValueDictionary{
                        { "controller", "Home" },
                        { "action", "Lugar" },
                        { "redirect", context.HttpContext.Request.Path }
                    };

                    context.Result = new RedirectToRouteResult(url);
                    return;
                }
            }
        }
    }
}
