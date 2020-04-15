using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;

namespace Clasificados.Filters
{

    public class ErrorHandlerAttribute : IExceptionFilter, IAsyncExceptionFilter
    {
        private ILogger Logger { get; }
        public ErrorHandlerAttribute(ILogger logger)
        {
            Logger = logger;
        }
        public Task OnExceptionAsync(ExceptionContext context)
        {
            if (context.ExceptionHandled == false)
            {
                var ignore =
                context.Exception.Message.Contains("Cannot return null from an action method with a return type of 'Microsoft.AspNetCore.Mvc.IActionResult'");

                if (ignore)
                {
                    return Task.CompletedTask;
                }
                Logger.Error(context.Exception, "Uncaught async exception");
            }

            return Task.CompletedTask;
        }

        public void OnException(ExceptionContext context)
        {
            if (context.ExceptionHandled == false)
            {
                Logger.Error(context.Exception, "Uncaught exception");
            }
        }
    }
}