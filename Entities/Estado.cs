using System;

namespace Entities
{
    public class Estado
    {
        public Int64 Id { get; set; }
        public string Nombre { get; set; }
        public string Url { get; set; }
        public Ciudad[] Ciudades { get; set; }
    }
}
