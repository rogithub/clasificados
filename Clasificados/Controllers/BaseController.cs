using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Clasificados.Models;
using System.Text;
using Entities;
using System;

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

    public long CiudadId
    {
        get
        {
            byte[] ciudad = new byte[8];
            return HttpContext.Session.TryGetValue("Ciudad", out ciudad) ?
            BitConverter.ToInt64(ciudad) :
            -1;
        }
        set
        {
            HttpContext.Session.Set("Ciudad", BitConverter.GetBytes(value));
        }
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
