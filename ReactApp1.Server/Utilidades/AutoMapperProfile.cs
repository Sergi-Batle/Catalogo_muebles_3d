using AutoMapper;
using ReactApp1.Server.DTOs;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Utilidades
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
       
            #region Producto
            CreateMap<Producto, ProductoDTO>().ReverseMap();

            #endregion Producto

        }

    }
}
