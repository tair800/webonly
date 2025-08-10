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
            await SeedEmployeesAsync();
            await SeedAboutLogosAsync();
            await _context.SaveChangesAsync();
        }

        private async Task SeedProductsAsync()
        {
            if (_context.Products.Any()) return;
            // Based on webonly/src/data/productData.js
            var seedDefs = new[]
            {
                new {
                    Name = "Market",
                    Subtext = "Satış və anbar",
                    Icon = "/assets/market-icon.png",
                    Alt = "Market",
                    Path = "/market",
                    MainImage = "/uploads/products/1/20250810124244246_market1.png",
                    SectionImages = new []{ "/uploads/products/1/20250810131655495_market2.png", "/uploads/products/1/20250810131703800_market3.png", "/uploads/products/1/20250810131710713_market4.png" },
                    Description = "Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər.",
                    Sections = new (string title, string? description, string? moreText)[]
                    {
                        ("Satış və Kassa İdarəetməsi", "Satış nöqtəsinin idarə olunması, satış tempinə nəzarət və müxtəlif mal qruplarına görə çeşidləmə imkanı mövcuddur. Endirimlər mal, şöbə, tarix və saata əsasən təyin edilə bilər. Barkodlu satış, çəki və ədədə görə əməliyyatlar, barkodlu tərəzi ilə inteqrasiya mümkündür. Satış faizi ilə avtomatik qiymət hesablana bilər. Alış-veriş statistikası izlənir, sensorlu ekran dəstəyi və müştəriyə dərhal faktura verilməsi təmin olunur.", "Kassalara limitsiz kassir təyin etmək, günlük hesabatlar hazırlamaq, nağd və bank hesabları arası köçürmələri izləmək, qaytarma və ləğv əməliyyatlarını hesabatlarda göstərmək mümkündür."),
                        ("Müştəri və CRM İdarəetməsi", "Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər. Alış-veriş tarixçəsinə əsasən müştəriləri qruplaşdırmaq və analiz etmək mümkündür. Şikayət və təkliflər toplanır, fərdi qiymət və endirim kartları təyin olunur.", null),
                        ("Təchizat və Anbar İdarəetməsi", "Anbarlarda mal qrupları üzrə statistika, giriş-çıxış sənədləri və transferlər idarə olunur. Mağaza və anbarlara görə qalıqlar izlənir, avtomatik sənədləşmə aparılır. Barkodlu mobil cihaz dəstəyi, satış və maya dəyərinin analiz olunması, həmçinin avtomatik sayma funksiyası ilə mal itkisinə nəzarət mümkündür.", "Satınalma sifarişləri mərhələli şəkildə qəbul edilir, valyuta seçimi və e-poçtla təchizatçılara göndərmək mümkündür. Qaytarma, dəyişdirmə və hesablaşmalar təqib olunur.")
                    }
                },
                new {
                    Name = "Tekstil Modulu",
                    Subtext = "İstehsal və toxuculuq",
                    Icon = "/assets/textile.png",
                    Alt = "Tekstil",
                    Path = "/textile",
                    MainImage = "/uploads/products/1/20250810124244246_market1.png",
                    SectionImages = new []{ "/uploads/products/1/20250810131655495_market2.png", "/uploads/products/1/20250810131703800_market3.png" },
                    Description = "Tekstil Modulunuz Pambıqdan Başlayaraq Hazır Məhsula Qədər Bütün İstehsal Proseslərini İdarə Edə, Material Əsasında Xərc Və Qazanc Hesabatlarını Hazırlaya Bilər.",
                    Sections = new (string title, string? description, string? moreText)[]
                    {
                        ("İstehsal və Texnologiya İdarəetməsi", "İstehsal proseslərinin planlaşdırılması, texnologiya axınlarının idarə olunması və keyfiyyət nəzarəti funksiyaları mövcuddur. Material tələbatının hesablanması, istehsal cədvəllərinin hazırlanması və avtomatik sifariş sistemi ilə təchizat idarə olunur. Toxuculuq və tikiş avadanlıqlarının texniki xidməti izlənir, istehsal standartları təyin edilir.", null),
                        ("Material və Anbar İdarəetməsi", "Xammal və yarımfabrikatların anbar idarəetməsi, material axınlarının izlənilməsi və keyfiyyət yoxlaması aparılır. Rəng və ölçü çeşidlərinin idarə olunması, material itkisinin minimuma endirilməsi və avtomatik hesabatlar hazırlanır.", null),
                        ("Satış və Müştəri İdarəetməsi", "Hazır məhsulların satışı, müştəri sifarişlərinin idarə olunması və çatdırılma prosesləri izlənir. Müştəri tələblərinə uyğun məhsul dizaynı, ölçü və rəng seçimləri, həmçinin keyfiyyət zəmanəti xidmətləri təmin olunur.", "E-ticarət platformaları ilə inteqrasiya, onlayn sifariş sistemi və avtomatik qiymət hesablama funksiyaları mövcuddur. Müştəri məmnuniyyəti və geri qaytarma prosesləri idarə olunur.")
                    }
                },
                new {
                    Name = "Mobil satış",
                    Subtext = "Mobil satış nöqtələri",
                    Icon = "/assets/mobile.png",
                    Alt = "Mobil",
                    Path = "/mobile",
                    MainImage = "/uploads/products/1/20250810124244246_market1.png",
                    SectionImages = new []{ "/uploads/products/1/20250810131655495_market2.png", "/uploads/products/1/20250810131703800_market3.png", "/uploads/products/1/20250810131710713_market4.png" },
                    Description = "Mobil Satış Modulunuz Satıcılarınızın Hər Yerdə Satış Əməliyyatlarını Həyata Keçirməsinə İmkan Verə, Real Vaxtda Mərkəzi Sistemlə Sinkronlaşdıra Bilər.",
                    Sections = new (string title, string? description, string? moreText)[]
                    {
                        ("Mobil Satış Nöqtələri", "Mobil cihazlar vasitəsilə satış əməliyyatlarının həyata keçirilməsi, barkod skan etmə və QR kod oxuma funksiyaları mövcuddur. Nağd və kart ödənişləri, endirim və bonus sistemləri, həmçinin müştəri məlumatlarının dərhal qeydiyyatı təmin olunur.", null),
                        ("Real Vaxt Sinkronizasiyası", "Mobil satış nöqtələri ilə mərkəzi sistem arasında real vaxtda məlumat mübadiləsi, anbar qalıqlarının avtomatik yenilənməsi və satış hesabatlarının dərhal hazırlanması funksiyaları mövcuddur.", null),
                        ("Mobil Anbar İdarəetməsi", "Mobil cihazlarla anbar əməliyyatlarının idarə olunması, mal qəbulu və çıxarılması, inventar sayımı və avtomatik hesabatların hazırlanması funksiyaları mövcuddur.", "GPS izləmə sistemi ilə satıcıların hərəkətlərinin izlənilməsi, satış nöqtələrinin xəritədə göstərilməsi və performans analizi aparılır. Offline rejimdə işləmə imkanı və məlumatların avtomatik sinxronlaşdırılması təmin olunur.")
                    }
                },
                new {
                    Name = "Aptek İdarəetmə sistemi",
                    Subtext = "Dərman və reçetə",
                    Icon = "/assets/medicine.png",
                    Alt = "Aptek",
                    Path = "/medicine",
                    MainImage = "/uploads/products/1/20250810124244246_market1.png",
                    SectionImages = new []{ "/uploads/products/1/20250810131655495_market2.png", "/uploads/products/1/20250810131703800_market3.png", "/uploads/products/1/20250810131710713_market4.png" },
                    Description = "Aptek İdarəetmə Sistemi Dərmanların Satışından Tutmuş Reçetə İdarəetməsinə Qədər Bütün Prosesləri Avtomatlaşdıraraq Təhlükəsiz və Səmərəli İdarəetmə Təmin Edir.",
                    Sections = Array.Empty<(string,string?,string?)>()
                },
                new {
                    Name = "Ticarət və Anbar",
                    Subtext = "Böyük həcmli ticarət",
                    Icon = "/assets/factory.png",
                    Alt = "Fabrika",
                    Path = "/factory",
                    MainImage = "/uploads/products/1/20250810124244246_market1.png",
                    SectionImages = new []{ "/uploads/products/1/20250810131655495_market2.png", "/uploads/products/1/20250810131703800_market3.png", "/uploads/products/1/20250810131710713_market4.png" },
                    Description = "Ticarət və Anbar Modulunuz Böyük Həcmdə Mal Dövriyyəsinin İdarə Olunması...",
                    Sections = Array.Empty<(string,string?,string?)>()
                },
                new {
                    Name = "Kredit və Lombard",
                    Subtext = "Maliyyə xidmətləri",
                    Icon = "/assets/credit.png",
                    Alt = "Kredit",
                    Path = "/credit",
                    MainImage = "/uploads/products/1/20250810124244246_market1.png",
                    SectionImages = new []{ "/uploads/products/1/20250810131655495_market2.png", "/uploads/products/1/20250810131703800_market3.png", "/uploads/products/1/20250810131710713_market4.png" },
                    Description = "Kredit və Lombard Modulunuz Müxtəlif Növ Kredit Xidmətlərinin Təqdim Edilməsi...",
                    Sections = Array.Empty<(string,string?,string?)>()
                }
            };

            foreach (var d in seedDefs)
            {
                var p = new Product
                {
                    Name = d.Name,
                    Subtext = d.Subtext,
                    Icon = d.Icon,
                    Alt = d.Alt,
                    Path = d.Path,
                    MainImage = d.MainImage,
                    Description = d.Description,
                    ImageUrl = d.MainImage,
                };
                // Map up to first three sections into long text columns
                if (d.Sections.Length > 0) { p.Section1Title = d.Sections[0].title; p.Section1Description = d.Sections[0].description; p.Section1MoreText = d.Sections[0].moreText; }
                if (d.Sections.Length > 1) { p.Section2Title = d.Sections[1].title; p.Section2Description = d.Sections[1].description; p.Section2MoreText = d.Sections[1].moreText; }
                if (d.Sections.Length > 2) { p.Section3Title = d.Sections[2].title; p.Section3Description = d.Sections[2].description; p.Section3MoreText = d.Sections[2].moreText; }

                _context.Products.Add(p);
                await _context.SaveChangesAsync();

                // Add images as ProductImages with incrementing order
                var order = 0;
                var allImages = new List<string>();
                // ProductImages DbSet removed - skipping image seeding
            }
        }

        private async Task SeedServicesAsync()
        {
            if (_context.Services.Any()) return;
            // Based on webonly/src/data/servicesData.js
            var services = new List<(string Name, string Subtitle, string Icon, string DetailImage, string Description, List<(string num, string title, string? desc)> Articles)>
            {
                ("Bazanın arxivlənməsi", "Arxivləmə", "/assets/service1.png", "/assets/servicesDetail1.png", "Arxivləmə prosesi sistemdəki məlumatların təhlükəsizliyini və davamlılığını təmin etmək üçün vacib funksiyadır.", new()),
                ("Logların saxlanılması", "Loglama", "/assets/service2.png", "/assets/servicesDetail2.png", "Loglama sistemi bütün sistem əməliyyatlarının detallı qeydiyyatını saxlayır.", new List<(string,string,string?)> { ("01","Identify & Monitor Your Data","Verilənlərin buludda, mobil qurğuda və lokal mühitlərdə aşkarlanması və istifadəsinin izlənməsi imkanı təmin olunur."), ("02","Real-time Analytics","Sistem məlumatlarının real vaxtda analizi və hesabatların avtomatik hazırlanması funksiyası."), ("03","Security Monitoring","Təhlükəsizlik hadisələrinin izlənilməsi və avtomatik xəbərdarlıq sistemlərinin idarə edilməsi.") }),
                ("Hesabatların e-poçt göndərilməsi", "E-poçt", "/assets/service3.png", "/assets/servicesDetail3.png", "E-poçt modulu hesabatların avtomatik olaraq müəyyən istifadəçilərə göndərilməsini təmin edir.", new()),
                ("Mobil hesabatlar", "Mobil hesabatlar", "/assets/service4.png", "/assets/servicesDetail4.png", "Mobil hesabatlar modulu istifadəçilərə mobil cihazlar vasitəsilə sistem məlumatlarına daxil olmaq imkanı verir.", new()),
                ("Bazanın nüsxəsinin alınması", "Nüsxələmə", "/assets/service5.png", "/assets/servicesDetail5.png", "Nüsxələmə modulu verilənlər bazasının tam və ya qismən nüsxələrini almaq üçün istifadə olunur.", new()),
                ("Bonus modulunun tətbiqi", "Bonus modulu", "/assets/service6.png", "/assets/servicesDetail6.png", "Bonus modulu işçilərin performansını artırmaq və motivasiyalarını yüksəltmək üçün nəzərdə tutulmuşdur.", new()),
                ("Hesabatların hazırlanması", "Hesabatlar", "/assets/service7.png", "/assets/servicesDetail7.png", "Hesabatlar modulu müxtəlif növ hesabatların hazırlanması və təqdim edilməsi üçün istifadə olunur.", new()),
                ("Əməliyyat sisteminin yazılması", "Əməliyyat sistemi", "/assets/service8.png", "/assets/servicesDetail8.png", "Əməliyyat sistemi modulu müəssisənin əsas biznes proseslərini idarə etmək üçün nəzərdə tutulmuşdur.", new()),
                ("Sistemin audit olunması", "Audit", "/assets/service9.png", "/assets/servicesDetail9.png", "Audit modulu sistemin təhlükəsizliyini və performansını qiymətləndirmək üçün istifadə olunur.", new())
            };

            foreach (var s in services)
            {
                var entity = new Service
                {
                    Name = s.Name,
                    Subtitle = s.Subtitle,
                    Icon = s.Icon,
                    DetailImage = s.DetailImage,
                    Description = s.Description
                };
                _context.Services.Add(entity);
                await _context.SaveChangesAsync();

                // ServiceArticles DbSet removed - skipping article seeding
            }
        }

        private async Task SeedEquipmentAsync()
        {
            if (_context.Equipment.Any()) return;
            // Based on webonly/src/data/equipmentData.js (first three items)
            var eqDefs = new[]
            {
                new {
                    Name = "PosClass TX-1500S",
                    Version = "J-1900",
                    Core = "İntel Core I5",
                    Description = "Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.",
                    Img = "/uploads/equipment/equipment1.png",
                    Features = new []{ "Türkiyə İstehsalı Keyfiyyət", "1 İl Rəsmi Zəmanət", "Wi-Fi Adapter Artırma İmkanı", "10.1\" Arxa Ekran Əlavə İmkanı" },
                    Specs = new Dictionary<string,string?>
                    {
                        ["model"] = "J-1900",
                        ["screenSize"] = "15 inch LED LCD proyeksiyalı Kapasitiv panel",
                        ["multiTouch"] = "10 barmaq",
                        ["processor"] = "Intel BayTrail J1900 2.0 GHZ",
                        ["memory"] = "4GB DDR3 SODIMM - 8GB (1333/1666 MHz)",
                        ["storage"] = "120GB SSD HDD 2.5\" /MSATA - 240GB SSD artırma imkanı",
                        ["operatingSystem"] = "Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7",
                        ["graphics"] = "Intel HD Graphics 4000",
                        ["network"] = "10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n",
                        ["ports"] = "4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45",
                        ["power"] = "12V DC, 65W Power Adapter",
                        ["dimensions"] = "400 x 300 x 80 mm (W x D x H)",
                        ["weight"] = "2.5 kg"
                    }
                },
                new {
                    Name = "saPosClass TX-1500S",
                    Version = "J-1900",
                    Core = "İntel Core I5",
                    Description = "Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.",
                    Img = "/uploads/equipment/equipment1.png",
                    Features = new []{ "Türkiyə İstehsalı Keyfiyyət", "1 İl Rəsmi Zəmanət", "Wi-Fi Adapter Artırma İmkanı", "10.1\" Arxa Ekran Əlavə İmkanı" },
                    Specs = new Dictionary<string,string?>
                    {
                        ["model"] = "J-1900",
                        ["screenSize"] = "15 inch LED LCD proyeksiyalı Kapasitiv panel",
                        ["multiTouch"] = "10 barmaq",
                        ["processor"] = "Intel BayTrail J1900 2.0 GHZ",
                        ["memory"] = "4GB DDR3 SODIMM - 8GB (1333/1666 MHz)"
                    }
                },
                new {
                    Name = "PosClass TX-1500S",
                    Version = "J-1900",
                    Core = "İntel Core I5",
                    Description = "Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.",
                    Img = "/uploads/equipment/equipment1.png",
                    Features = new []{ "Türkiyə İstehsalı Keyfiyyət", "1 İl Rəsmi Zəmanət", "Wi-Fi Adapter Artırma İmkanı", "10.1\" Arxa Ekran Əlavə İmkanı" },
                    Specs = new Dictionary<string,string?>()
                }
            };

            foreach (var d in eqDefs)
            {
                var e = new Equipment
                {
                    Name = d.Name,
                    Version = d.Version,
                    Core = d.Core,
                    Description = d.Description,
                    ImageUrl = d.Img
                };
                _context.Equipment.Add(e);
                await _context.SaveChangesAsync();

                var order = 0;
                foreach (var f in d.Features)
                {
                    _context.EquipmentFeatures.Add(new EquipmentFeature
                    {
                        EquipmentId = e.Id,
                        Feature = f,
                        OrderIndex = order++
                    });
                }

                order = 0;
                foreach (var kv in d.Specs)
                {
                    _context.EquipmentSpecifications.Add(new EquipmentSpecification
                    {
                        EquipmentId = e.Id,
                        Key = kv.Key,
                        Value = kv.Value,
                        OrderIndex = order++
                    });
                }
                await _context.SaveChangesAsync();
            }
        }

        // References DbSet removed - skipping reference seeding

        private async Task SeedEmployeesAsync()
        {
            if (_context.Employees.Any()) return;
            
            // Use C# strings with proper Unicode encoding - EF Core will handle the NCHAR conversion
            var emps = new[]
            {
                new { Name = "Əli Məmmədov", Position = "Direktor", Image = "/assets/director.png", Phone = "+994 50 123 45 67", Email = "ali.mammadov@webonly.az", LinkedIn = "linkedin.com/in/ali-mammadov", Description = "10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir." },
                new { Name = "Name Surname", Position = "Baş proqram tərtibatçısı", Image = "/assets/employee.png", Phone = "+994 50 123 45 68", Email = "developer@company.com", LinkedIn = "linkedin.com/in/developer", Description = (string?)null },
                new { Name = "Name Surname", Position = "Layihə koordinatoru", Image = "/assets/employee.png", Phone = "+994 50 123 45 69", Email = "coordinator@company.com", LinkedIn = "linkedin.com/in/coordinator", Description = (string?)null },
                new { Name = "Name Surname", Position = "Baş proqramçı", Image = "/assets/employee.png", Phone = "+994 50 123 45 70", Email = "programmer@company.com", LinkedIn = "linkedin.com/in/programmer", Description = (string?)null },
                new { Name = "Name Surname", Position = "IT mütəxəssisi", Image = "/assets/employee.png", Phone = "+994 50 123 45 71", Email = "specialist@company.com", LinkedIn = "linkedin.com/in/specialist", Description = (string?)null },
                new { Name = "Name Surname", Position = "Layihələr üzrə şöbə rəhbəri", Image = "/assets/employee.png", Phone = "+994 50 123 45 72", Email = "manager@company.com", LinkedIn = "linkedin.com/in/manager", Description = (string?)null },
                new { Name = "Name Surname", Position = "Layihə meneceri", Image = "/assets/employee.png", Phone = "+994 50 123 45 73", Email = "project-manager@company.com", LinkedIn = "linkedin.com/in/project-manager", Description = (string?)null },
                new { Name = "Name Surname", Position = "SQL Server üzrə proqramçı", Image = "/assets/employee.png", Phone = "+994 50 123 45 74", Email = "sql-developer@company.com", LinkedIn = "linkedin.com/in/sql-developer", Description = (string?)null },
            };
            foreach (var e in emps)
            {
                _context.Employees.Add(new Employee
                {
                    Name = e.Name,
                    Position = e.Position,
                    Description = e.Description,
                    Phone = e.Phone,
                    Email = e.Email,
                    LinkedIn = e.LinkedIn,
                    ImageUrl = e.Image  // Fixed: Image -> ImageUrl
                });
            }
            await _context.SaveChangesAsync();
        }

        // Sliders DbSet removed - skipping slider seeding

        private async Task SeedAboutLogosAsync()
        {
            if (_context.AboutLogos.Any()) return;
            
            var aboutLogo = new AboutLogo
            {
                Heading = "Texnologiya ilə Gələcəyə Doğru",
                Subtext = "Softech-A şirkəti 10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir.",
                ImageUrl = "/assets/logo-only.png"
            };
            
            await _context.AboutLogos.AddAsync(aboutLogo);
        }
    }
}
