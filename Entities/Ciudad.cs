using System;

namespace Entities
{
    public class Ciudad: ILongId
    {
        public Int64 Id { get; set; }
        public Int64 EstadoId { get; set; }
        public string Nombre { get; set; }
        public string Url { get; set; }
    }
}
