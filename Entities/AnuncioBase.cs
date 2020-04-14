using System;

namespace Entities
{
    public class AnuncioBase : ILongId
    {
        public Int64 Id { get; set; }
        public Int64 CiudadId { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public bool Activo { get; set; }
    }
}
