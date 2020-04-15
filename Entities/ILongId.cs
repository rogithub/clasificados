using System;

namespace Entities
{
    public interface ILongId
    {
        Int64 Id { get; set; }
    }

    public interface IFecha
    {
        DateTime Fecha { get; set; }
    }
}
