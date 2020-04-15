using AutoMapper;

namespace Clasificados.Mappers
{
    public class VehiculosProfile : Profile
    {
        public VehiculosProfile()
        {
            this.CreateMap<Entities.Vehiculo, Models.Vehiculo>();
            this.CreateMap<Models.Vehiculo, Entities.Vehiculo>();
        }
    }
}
