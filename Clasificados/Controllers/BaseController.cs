using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;
using System.Text;

public class BaseController : Controller
{
    protected ILogger Logger { get; set; }
    public BaseController(ILogger logger)
    {
        Logger = logger;
    }

    private byte[] ToBytes(string text)
    {
        var utf8 = new UTF8Encoding();
        return utf8.GetBytes(text);
    }
    private string FromBytes(byte[] arr)
    {
        if (arr == null) return string.Empty;
        return System.Text.Encoding.UTF8.GetString(arr).Trim();
    }

    public string Ciudad
    {

        get
        {
            byte[] ciudad = new byte[100];
            return HttpContext.Session.TryGetValue("Ciudad", out ciudad) ?
            FromBytes(ciudad) :
            string.Empty;
        }
        set
        {
            HttpContext.Session.Set("Ciudad", ToBytes(value));
        }
    }

    public string Estado
    {

        get
        {
            byte[] estado = new byte[100];
            HttpContext.Session.TryGetValue("Estado", out estado);
            return FromBytes(estado);
        }
        set
        {
            HttpContext.Session.Set("Estado", ToBytes(value));
        }
    }
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
