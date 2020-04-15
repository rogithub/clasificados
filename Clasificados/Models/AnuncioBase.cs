using System;
using System.ComponentModel.DataAnnotations;
using Entities;

namespace Clasificados.Models
{
    public class AnuncioBase : ILongId, IFecha
    {
        [Required]
        public Int64 Id { get; set; }
        [Required]
        public Int64 CiudadId { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public DateTime Fecha { get; set; }
        [Required]
        public bool Activo { get; set; }
    }
}
