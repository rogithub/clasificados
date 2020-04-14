using AutoMapper;

namespace Clasificados.Mappers
{
    public class OrderColProfile : Profile
    {
        public OrderColProfile()
        {
            this.CreateMap<Entities.OrderCol, Models.OrderCol>();
            this.CreateMap<Models.OrderCol, Entities.OrderCol>();
        }
    }

    public class SearchDataProfile : Profile
    {
        public SearchDataProfile()
        {
            this.CreateMap<Entities.SearchData, Models.SearchData>();
            this.CreateMap<Models.SearchData, Entities.SearchData>();
        }
    }
}
