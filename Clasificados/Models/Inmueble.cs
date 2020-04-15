using System;

namespace Clasificados.Models
{
    public enum VentaRenta
    {
        Venta,
        Renta
    }

    public enum CasaTerreno
    {
        Casa,
        Terreno
    }

    public class Inmueble : AnuncioBase
    {
        public VentaRenta VentaRenta { get; set; }
        public CasaTerreno CasaTerreno { get; set; }
    }
}
