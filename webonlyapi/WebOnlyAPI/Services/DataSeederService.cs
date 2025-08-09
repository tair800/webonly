using WebOnlyAPI.Data;
using WebOnlyAPI.Models;

namespace WebOnlyAPI.Services
{
    public class DataSeederService
    {
        private readonly ApplicationDbContext _context;

        public DataSeederService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedAllDataAsync()
        {
            await SeedProductsAsync();
            await SeedServicesAsync();
            await SeedEquipmentAsync();
            await SeedSlidersAsync();
            await _context.SaveChangesAsync();
        }

        private async Task SeedProductsAsync()
        {
            if (_context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Id = 1,
                    Name = "Market",
                    Subtext = "Satış və anbar",
                    Icon = "/assets/market-icon.png",
                    Alt = "Market",
                    Path = "/market",
                    MainImage = "/assets/market1.png",
                    Description = "Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər.",
                    ImageUrl = "/assets/market1.png"
                },
                new Product
                {
                    Id = 2,
                    Name = "Tekstil Modulu",
                    Subtext = "İstehsal və toxuculuq",
                    Icon = "/assets/textile.png",
                    Alt = "Tekstil",
                    Path = "/textile",
                    MainImage = "/assets/market1.png",
                    Description = "Tekstil Modulunuz Pambıqdan Başlayaraq Hazır Məhsula Qədər Bütün İstehsal Proseslərini İdarə Edə, Material Əsasında Xərc Və Qazanc Hesabatlarını Hazırlaya Bilər.",
                    ImageUrl = "/assets/market1.png"
                }
            };

            await _context.Products.AddRangeAsync(products);
        }

        private async Task SeedServicesAsync()
        {
            if (_context.Services.Any()) return;

            var services = new List<Service>
            {
                new Service { Id = 1, Name = "Bazanın arxivlənməsi", Subtitle = "Arxivləmə", Icon = "/assets/service1.png", DetailImage = "/assets/servicesDetail1.png", Description = "Arxivləmə prosesi sistemdəki məlumatların təhlükəsizliyini və davamlılığını təmin etmək üçün vacib funksiyadır." },
                new Service { Id = 2, Name = "Logların saxlanılması", Subtitle = "Loglama", Icon = "/assets/service2.png", DetailImage = "/assets/servicesDetail2.png", Description = "Loglama sistemi bütün sistem əməliyyatlarının detallı qeydiyyatını saxlayır." }
            };

            await _context.Services.AddRangeAsync(services);
        }

        private async Task SeedEquipmentAsync()
        {
            if (_context.Equipment.Any()) return;

            var equipment = new List<Equipment>
            {
                new Equipment
                {
                    Id = 1,
                    Name = "PosClass TX-1500S",
                    Version = "J-1900",
                    Core = "İntel Core I5",
                    Description = "Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal.",
                    ImageUrl = "/assets/equipment1.png"
                }
            };

            await _context.Equipment.AddRangeAsync(equipment);
        }

        private async Task SeedSlidersAsync()
        {
            if (_context.Sliders.Any()) return;

            var sliders = new List<Slider>
            {
                new Slider { Id = 1, Name = "slider1", ImageUrl = "/assets/slider1.png", OrderIndex = 1, IsActive = true },
                new Slider { Id = 2, Name = "slider2", ImageUrl = "/assets/slider2.png", OrderIndex = 2, IsActive = true },
                new Slider { Id = 3, Name = "slider3", ImageUrl = "/assets/slider3.png", OrderIndex = 3, IsActive = true },
                new Slider { Id = 4, Name = "slider4", ImageUrl = "/assets/slider4.png", OrderIndex = 4, IsActive = true },
                new Slider { Id = 5, Name = "slider5", ImageUrl = "/assets/slider5.png", OrderIndex = 5, IsActive = true },
                new Slider { Id = 6, Name = "slider6", ImageUrl = "/assets/slider6.png", OrderIndex = 6, IsActive = true }
            };

            await _context.Sliders.AddRangeAsync(sliders);
        }
    }
}
