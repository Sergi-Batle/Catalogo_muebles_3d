using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.DTOs;
using ReactApp1.Server.Models;
using ReactApp1.Server.Repositorio.Contrato;

namespace ReactApp1.Server.Repositorio.Implementacion
{
    public class CatalogoRepositorio : ICatalogoRepositorio
    {
        private readonly FurnistoreContext _dbContext;
        private readonly IMapper _mapper;

        public CatalogoRepositorio(FurnistoreContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<ProductoDTO>> Lista()
        {
            try
            {
                return _mapper.Map<List<ProductoDTO>>(await _dbContext.Productos.ToListAsync());
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Borrar(int id)
        {
            try
            {
                Producto producto = await _dbContext.Productos.FindAsync(id);
                if (producto == null)
                {
                    return false;
                }
                _dbContext.Productos.Remove(producto);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(ProductoDTO producto)
        {
            try
            {
                Producto _producto = await _dbContext.Productos.FindAsync(producto.Id);
                if (_producto == null)
                {
                    return false;
                }
                _mapper.Map(producto, _producto);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al editar producto: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> Agregar(ProductoDTO producto)
        {
            try
            {
                Producto _producto = _mapper.Map<Producto>(producto);
                await _dbContext.Productos.AddAsync(_producto);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }
    }
}
