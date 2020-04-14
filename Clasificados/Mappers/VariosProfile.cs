using AutoMapper;

namespace Clasificados.Mappers
{
    public class VariosProfile : Profile
    {
        public VariosProfile()
        {
            this.CreateMap<Entities.Varios, Models.Varios>();
            this.CreateMap<Models.Varios, Entities.Varios>();
        }
    }
}
