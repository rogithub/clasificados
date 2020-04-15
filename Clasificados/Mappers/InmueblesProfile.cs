using AutoMapper;

namespace Clasificados.Mappers
{
    public class InmueblesProfile : Profile
    {
        public InmueblesProfile()
        {
            this.CreateMap<Entities.Inmueble, Models.Inmueble>();
            this.CreateMap<Models.Inmueble, Entities.Inmueble>();
        }
    }

    public class CasaTerrenoProfile : Profile
    {
        public CasaTerrenoProfile()
        {
            this.CreateMap<Entities.CasaTerreno, Models.CasaTerreno>();
            this.CreateMap<Models.CasaTerreno, Entities.CasaTerreno>();
        }
    }

    public class VentaRentaProfile : Profile
    {
        public VentaRentaProfile()
        {
            this.CreateMap<Entities.VentaRenta, Models.VentaRenta>();
            this.CreateMap<Models.VentaRenta, Entities.VentaRenta>();
        }
    }
}
