using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.DTOs;
using ReactApp1.Server.Utilidades;
using AutoMapper;
using ReactApp1.Server.Repositorio.Contrato;
using Microsoft.Extensions.Logging;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        private readonly ICatalogoRepositorio _catalogoRepositorio;
        private readonly ILogger<CatalogController> _logger;

        public CatalogController(ICatalogoRepositorio catalogoRepositorio, ILogger<CatalogController> logger)
        {
            _catalogoRepositorio = catalogoRepositorio;
            _logger = logger;
        }

        // Ruta única para evitar conflictos
        [HttpGet("saludo")]
        public string Get()
        {
            return "ola";
        }

        [HttpGet("productos")]
        public async Task<IEnumerable<ProductoDTO>> GetCatalog()
        {
            List<ProductoDTO> _listaArchivos = await _catalogoRepositorio.Lista();

            return _listaArchivos.Select(archivo =>
            {
                string ruta = @"3dmodels\" + archivo.Objeto;
                archivo.Objeto = System.IO.File.Exists(Path.Combine("wwwroot", ruta)) ? ruta : archivo.Objeto;

                return archivo;
            });
        }

        [HttpDelete("borrar/{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _catalogoRepositorio.Borrar(id);
        }

        [HttpPut("editar")]
        public async Task<bool> Put([FromBody] ProductoDTO producto)
        {
            return await _catalogoRepositorio.Editar(producto);
        }

        [HttpPost("agregar")]
        public async Task<bool> Post([FromForm] ProductoDTO producto)
        {

            _logger.LogInformation(producto.ToString());


            if (producto.Imagen != null)
            {
                try
                {
                    var fileName = Path.GetFileName(producto.Imagen.FileName);
                    var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "3dmodels");

                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }

                    var filePath = Path.Combine(uploadPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await producto.Imagen.CopyToAsync(stream);
                    }


                    producto.Imagen = null;

                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error al guardar la imagen: {ex.Message}");
                    return false;
                }
            }

            return await _catalogoRepositorio.Agregar(producto);
        }
    }
}
