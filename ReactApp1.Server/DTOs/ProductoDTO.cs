namespace ReactApp1.Server.DTOs
{
    public class ProductoDTO
    {
        public int Id { get; set; }

        public IFormFile? Imagen { get; set; }

        public string? Objeto { get; set; }

        public double Ancho { get; set; }

        public double Largo { get; set; }

        public double Alto { get; set; }

        public double? Precio { get; set; }

        public string? Descripcion { get; set; }

        public string? Nombre { get; set; }
    }

}
