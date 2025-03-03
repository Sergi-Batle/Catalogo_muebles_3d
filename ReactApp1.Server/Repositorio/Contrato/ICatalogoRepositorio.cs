using ReactApp1.Server.Models;
using ReactApp1.Server.DTOs;

namespace ReactApp1.Server.Repositorio.Contrato
{
    public interface ICatalogoRepositorio
    {
        Task<List<ProductoDTO>> Lista();

        Task<bool> Borrar(int id);

        Task<bool> Editar(ProductoDTO producto);

        Task<bool> Agregar(ProductoDTO producto);
    }
}
