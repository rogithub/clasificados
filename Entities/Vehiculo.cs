using System;

namespace Entities
{
    public class Vehiculo : AnuncioBase
    {
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public int Año { get; set; }
    }
}
