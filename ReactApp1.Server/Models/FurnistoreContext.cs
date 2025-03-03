using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Models;

public partial class FurnistoreContext : DbContext
{
    public FurnistoreContext()
    {
    }

    public FurnistoreContext(DbContextOptions<FurnistoreContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Producto> Productos { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Producto__3213E83F7D93CEB1");

            entity.ToTable("Producto");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Alto).HasColumnName("alto");
            entity.Property(e => e.Ancho).HasColumnName("ancho");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.Imagen).HasColumnName("imagen");
            entity.Property(e => e.Largo).HasColumnName("largo");
            entity.Property(e => e.Nombre).HasColumnName("nombre");
            entity.Property(e => e.Objeto).HasColumnName("objeto");
            entity.Property(e => e.Precio).HasColumnName("precio");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
