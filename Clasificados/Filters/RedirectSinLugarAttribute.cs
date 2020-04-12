using System;
using System.Threading.Tasks;
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

                string ciudad = controller.Ciudad;
                string estado = controller.Estado;

                if (string.IsNullOrWhiteSpace(ciudad) || string.IsNullOrWhiteSpace(estado))
                {
                    var url = new RouteValueDictionary{
                    { "controller", "Home" },
                    { "action", "Lugar" }
                };

                    context.Result = new RedirectToRouteResult(url);
                    return;
                }
            }

        }
    }
}
