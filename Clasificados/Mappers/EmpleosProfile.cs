using AutoMapper;

namespace Clasificados.Mappers
{
    public class EmpleosProfile : Profile
    {
        public EmpleosProfile()
        {
            this.CreateMap<Entities.Empleo, Models.Empleo>();
            this.CreateMap<Models.Empleo, Entities.Empleo>();
        }
    }
}
