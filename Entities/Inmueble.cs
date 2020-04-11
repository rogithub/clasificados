using System;

namespace Entities
{
    public class Inmueble : AnuncioBase
    {
        public VentaRenta VentaRenta { get; set; }
        public CasaTerreno CasaTerreno { get; set; }
    }
}
