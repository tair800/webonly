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
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<Service> Services { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Employee entity
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Heading).IsRequired().HasMaxLength(100);
                entity.Property(e => e.JobName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Telefon).HasMaxLength(20);
                entity.Property(e => e.Mail).HasMaxLength(100);
                entity.Property(e => e.LinkedIn).HasMaxLength(200);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
            });

            // Configure Reference entity
            modelBuilder.Entity<Reference>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
            });

            // Configure Product entity
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Subtext).HasMaxLength(1000);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
            });

            // Configure Equipment entity
            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Features).HasMaxLength(1000);
                entity.Property(e => e.Title).HasMaxLength(100);
                entity.Property(e => e.Specs).HasMaxLength(1000);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
            });

            // Configure Service entity
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Subtext).HasMaxLength(1000);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
            });
        }
    }
}
