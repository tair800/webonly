using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Reference> References { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductSection> ProductSections { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<EquipmentFeature> EquipmentFeatures { get; set; }
        public DbSet<EquipmentSpecification> EquipmentSpecifications { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<ServiceArticle> ServiceArticles { get; set; }
        public DbSet<Slider> Sliders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Employee entity
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Position).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.LinkedIn).HasMaxLength(200);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
            });

            // Configure Reference entity
            modelBuilder.Entity<Reference>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
                entity.Property(e => e.Alt).HasMaxLength(100);
            });

            // Configure Product entity
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Subtext).HasMaxLength(1000);
                entity.Property(e => e.Icon).HasMaxLength(100);
                entity.Property(e => e.Alt).HasMaxLength(100);
                entity.Property(e => e.Path).HasMaxLength(100);
                entity.Property(e => e.MainImage).HasMaxLength(500);
                entity.Property(e => e.Description).HasMaxLength(2000);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
            });

            // Configure Equipment entity
            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Version).HasMaxLength(100);
                entity.Property(e => e.Core).HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(2000);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
                // Removed legacy flat columns (Features/Title/Specs); using related tables instead
            });

            // Configure Service entity
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Subtitle).HasMaxLength(100);
                entity.Property(e => e.Icon).HasMaxLength(100);
                entity.Property(e => e.DetailImage).HasMaxLength(500);
                entity.Property(e => e.Description).HasMaxLength(2000);
                entity.Property(e => e.Subtext).HasMaxLength(1000);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
            });

            // Configure ProductSection entity
            modelBuilder.Entity<ProductSection>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ProductId).IsRequired();
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(2000);
                entity.Property(e => e.MoreText).HasMaxLength(1000);
                entity.Property(e => e.OrderIndex).IsRequired();
                
                entity.HasOne(ps => ps.Product)
                    .WithMany(p => p.Sections)
                    .HasForeignKey(ps => ps.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure EquipmentFeature entity
            modelBuilder.Entity<EquipmentFeature>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.EquipmentId).IsRequired();
                entity.Property(e => e.Feature).IsRequired().HasMaxLength(200);
                entity.Property(e => e.OrderIndex).IsRequired();
                
                entity.HasOne(ef => ef.Equipment)
                    .WithMany(e => e.FeaturesList)
                    .HasForeignKey(ef => ef.EquipmentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure EquipmentSpecification entity
            modelBuilder.Entity<EquipmentSpecification>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.EquipmentId).IsRequired();
                entity.Property(e => e.Key).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Value).HasMaxLength(500);
                entity.Property(e => e.OrderIndex).IsRequired();
                
                entity.HasOne(es => es.Equipment)
                    .WithMany(e => e.Specifications)
                    .HasForeignKey(es => es.EquipmentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure ServiceArticle entity
            modelBuilder.Entity<ServiceArticle>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ServiceId).IsRequired();
                entity.Property(e => e.Number).IsRequired().HasMaxLength(10);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.OrderIndex).IsRequired();
                
                entity.HasOne(sa => sa.Service)
                    .WithMany(s => s.Articles)
                    .HasForeignKey(sa => sa.ServiceId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure Slider entity
            modelBuilder.Entity<Slider>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
                entity.Property(e => e.OrderIndex).IsRequired();
                entity.Property(e => e.IsActive).IsRequired();
            });
        }
    }
}
