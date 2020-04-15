using System;
using System.ComponentModel.DataAnnotations;

namespace Clasificados.Models
{
    public class Vehiculo : AnuncioBase
    {

        [Required]
        public string Marca { get; set; }
        [Required]
        public string Modelo { get; set; }
        [Required]
        public int Año { get; set; }
    }
}
