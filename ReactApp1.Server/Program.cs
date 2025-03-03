using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using ReactApp1.Server.Repositorio.Contrato;
using ReactApp1.Server.Repositorio.Implementacion;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Habilitar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("reactCatalog",
        policy =>
        {
            policy.WithOrigins("https://localhost:58389",
                                "https://localhost:7161", 
                                "https://localhost:58391",
                                "http://127.0.0.1:5500");
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.AllowCredentials();
        });
});

builder.Services.AddDbContext<FurnistoreContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("sqlConection"));
});

builder.Services.AddScoped<ICatalogoRepositorio, CatalogoRepositorio>();

builder.Services.AddAutoMapper(typeof(Program));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ReactApp1.Server", Version = "1.0" });

    // Configurar la búsqueda de anotaciones de XML para mejorar la documentación (opcional)
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// Add services to the container.

builder.Services.AddControllers();
var app = builder.Build();

app.UseDefaultFiles();

//Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ReactApp1.Server v1"));
}

app.MapStaticAssets();
app.UseCors("reactCatalog");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");



app.Run();
