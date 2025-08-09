-- Unicode-safe reseed for Products, ProductSections, Equipment (+Features/Specs), Sliders, Employees, References
-- Safe to run multiple times
BEGIN TRAN;

-- Clear child tables first
DELETE FROM ProductSections;
DELETE FROM EquipmentFeatures;
DELETE FROM EquipmentSpecifications;
-- Keep Services as already fixed separately
-- DELETE FROM ServiceArticles; DELETE FROM Services;
DELETE FROM Sliders;
DELETE FROM Employees;
DELETE FROM [References];
DELETE FROM Products;
DELETE FROM Equipment;

-- Reseed identities
DBCC CHECKIDENT ('Products', RESEED, 0);
DBCC CHECKIDENT ('Equipment', RESEED, 0);
DBCC CHECKIDENT ('Sliders', RESEED, 0);
DBCC CHECKIDENT ('Employees', RESEED, 0);
DBCC CHECKIDENT ('[References]', RESEED, 0);

-- Products
SET IDENTITY_INSERT Products ON;
INSERT INTO Products (Id, Name, Subtext, Icon, Alt, Path, MainImage, Description, ImageUrl, CreatedAt) VALUES
(1, N'Market', N'Satış və anbar', N'/assets/market-icon.png', N'Market', N'/market', N'/assets/market1.png', N'Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Barkodlu Mal Sərgiləyən Və Tətbiqini Həyata Keçirərək Müştərinin Tələblərinə Daha Sürətli Cavab Verəcək Və Anbarınızı Nəzarətdə Saxlaya Biləcəksiniz.', NULL, GETDATE()),
(2, N'Tekstil Modulu', N'İstehsal və toxuculuq', N'/assets/textile.png', N'Tekstil', N'/textile', N'/assets/market1.png', N'Tekstil Modulunuz Pambıqdan Başlayaraq Hazır Məhsula Qədər Bütün İstehsal Proseslərini İdarə Edə, Material Əsasında Xərc Və Qazanc Hesabatlarını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Toxuculuq Və Tikiş Emalatxanalarınızı Rəqəmsallaşdıraraq İstehsal Səviyyənizi Artıra Biləcəksiniz.', NULL, GETDATE()),
(3, N'Mobil satış', N'Mobil satış nöqtələri', N'/assets/mobile.png', N'Mobil', N'/mobile', N'/assets/market1.png', N'Mobil Satış Modulunuz Satıcılarınızın Hər Yerdə Satış Əməliyyatlarını Həyata Keçirməsinə İmkan Verə, Real Vaxtda Mərkəzi Sistemlə Sinkronlaşdıra Bilər. Bu Proqram Vasitəsilə Siz Mobil Satış Nöqtələrini Genişləndirərək Satış Həcminizi Artıra Biləcəksiniz.', NULL, GETDATE()),
(4, N'Aptek İdarəetmə sistemi', N'Dərman və reçetə', N'/assets/medicine.png', N'Aptek', N'/medicine', N'/assets/market1.png', N'Aptek İdarəetmə Sistemi Dərmanların Satışından Tutmuş Reçetə İdarəetməsinə Qədər Bütün Prosesləri Avtomatlaşdıraraq Təhlükəsiz və Səmərəli İdarəetmə Təmin Edir. Bu Proqram Vasitəsilə Siz Dərman Təhlükəsizliyini Təmin Edərək Müştərilərinə Keyfiyyətli Xidmət Göstərə Biləcəksiniz.', NULL, GETDATE()),
(5, N'Ticarət və Anbar', N'Böyük həcmli ticarət', N'/assets/factory.png', N'Fabrika', N'/factory', N'/assets/market1.png', N'Ticarət və Anbar Modulunuz Böyük Həcmdə Mal Dövriyyəsinin İdarə Olunması, Çoxlu Anbar Sistemlərinin Koordinasiyası və Beynəlxalq Ticarət Əməliyyatlarının Həyata Keçirilməsi Üçün Nəzərdə Tutulub. Bu Proqram Vasitəsilə Siz Kompleks Ticarət Əməliyyatlarınızı Səmərəli Şəkildə İdarə Edə Biləcəksiniz.', NULL, GETDATE()),
(6, N'Kredit və Lombard', N'Maliyyə xidmətləri', N'/assets/credit.png', N'Kredit', N'/credit', N'/assets/market1.png', N'Kredit və Lombard Modulunuz Müxtəlif Növ Kredit Xidmətlərinin Təqdim Edilməsi, Təhlükəsizlik Əşyalarının İdarə Olunması və Risk İdarəetməsi Funksiyalarını Birləşdirir. Bu Proqram Vasitəsilə Siz Maliyyə Xidmətlərinizi Təhlükəsiz və Səmərəli Şəkildə İdarə Edə Biləcəksiniz.', NULL, GETDATE());
SET IDENTITY_INSERT Products OFF;

-- Product Sections
INSERT INTO ProductSections (ProductId, Title, Description, MoreText, OrderIndex, CreatedAt) VALUES
-- Market sections
(1, N'Satış və Kassa İdarəetməsi', N'Satış nöqtəsinin idarə olunması, satış tempinə nəzarət və müxtəlif mal qruplarına görə çeşidləmə imkanı mövcuddur. Endirimlər mal, şöbə, tarix və saata əsasən təyin edilə bilər. Barkodlu satış, çəki və ədədə görə əməliyyatlar, barkodlu tərəzi ilə inteqrasiya mümkündür. Satış faizi ilə avtomatik qiymət hesablana bilər. Alış-veriş statistikası izlənir, sensorlu ekran dəstəyi və müştəriyə dərhal faktura verilməsi təmin olunur.', N'Kassalara limitsiz kassir təyin etmək, günlük hesabatlar hazırlamaq, nağd və bank hesabları arası köçürmələri izləmək, qaytarma və ləğv əməliyyatlarını hesabatlarda göstərmək mümkündür.', 1, GETDATE()),
(1, N'Müştəri və CRM İdarəetməsi', N'Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər. Alış-veriş tarixçəsinə əsasən müştəriləri qruplaşdırmaq və analiz etmək mümkündür. Şikayət və təkliflər toplanır, fərdi qiymət və endirim kartları təyin olunur.', NULL, 2, GETDATE()),
(1, N'Təchizat və Anbar İdarəetməsi', N'Anbarlarda mal qrupları üzrə statistika, giriş-çıxış sənədləri və transferlər idarə olunur. Mağaza və anbarlara görə qalıqlar izlənir, avtomatik sənədləşmə aparılır. Barkodlu mobil cihaz dəstəyi, satış və maya dəyərinin analiz olunması, həmçinin avtomatik sayma funksiyası ilə mal itkisinə nəzarət mümkündür.', N'Satınalma sifarişləri mərhələli şəkildə qəbul edilir, valyuta seçimi və e-poçtla təchizatçılara göndərmək mümkündür. Qaytarma, dəyişdirmə və hesablaşmalar təqib olunur.', 3, GETDATE()),
-- Tekstil sections
(2, N'İstehsal və Texnologiya İdarəetməsi', N'İstehsal proseslərinin planlaşdırılması, texnologiya axınlarının idarə olunması və keyfiyyət nəzarəti funksiyaları mövcuddur. Material tələbatının hesablanması, istehsal cədvəllərinin hazırlanması və avtomatik sifariş sistemi ilə təchizat idarə olunur. Toxuculuq və tikiş avadanlıqlarının texniki xidməti izlənir, istehsal standartları təyin edilir.', NULL, 1, GETDATE()),
(2, N'Material və Anbar İdarəetməsi', N'Xammal və yarımfabrikatların anbar idarəetməsi, material axınlarının izlənilməsi və keyfiyyət yoxlaması aparılır. Rəng və ölçü çeşidlərinin idarə olunması, material itkisinin minimuma endirilməsi və avtomatik hesabatlar hazırlanır.', NULL, 2, GETDATE()),
(2, N'Satış və Müştəri İdarəetməsi', N'Hazır məhsulların satışı, müştəri sifarişlərinin idarə olunması və çatdırılma prosesləri izlənir. Müştəri tələblərinə uyğun məhsul dizaynı, ölçü və rəng seçimləri, həmçinin keyfiyyət zəmanəti xidmətləri təmin olunur.', N'E-ticarət platformaları ilə inteqrasiya, onlayn sifariş sistemi və avtomatik qiymət hesablama funksiyaları mövcuddur. Müştəri məmnuniyyəti və geri qaytarma prosesləri idarə olunur.', 3, GETDATE()),
-- Mobil satış sections
(3, N'Mobil Satış Nöqtələri', N'Mobil cihazlar vasitəsilə satış əməliyyatlarının həyata keçirilməsi, barkod skan etmə və QR kod oxuma funksiyaları mövcuddur. Nağd və kart ödənişləri, endirim və bonus sistemləri, həmçinin müştəri məlumatlarının dərhal qeydiyyatı təmin olunur.', NULL, 1, GETDATE()),
(3, N'Real Vaxt Sinkronizasiyası', N'Mobil satış nöqtələri ilə mərkəzi sistem arasında real vaxtda məlumat mübadiləsi, anbar qalıqlarının avtomatik yenilənməsi və satış hesabatlarının dərhal hazırlanması funksiyaları mövcuddur.', NULL, 2, GETDATE()),
(3, N'Mobil Anbar İdarəetməsi', N'Mobil cihazlarla anbar əməliyyatlarının idarə olunması, mal qəbulu və çıxarılması, inventar sayımı və avtomatik hesabatların hazırlanması funksiyaları mövcuddur.', N'GPS izləmə sistemi ilə satıcıların hərəkətlərinin izlənilməsi, satış nöqtələrinin xəritədə göstərilməsi və performans analizi aparılır. Offline rejimdə işləmə imkanı və məlumatların avtomatik sinxronlaşdırılması təmin olunur.', 3, GETDATE()),
-- Aptek sections
(4, N'Dərman Satışı və Reçetə İdarəetməsi', N'Reçetəli və reçetəsiz dərman satışının idarə olunması, reçetələrin elektron qeydiyyatı və dərman təhlükəsizliyinin təmin edilməsi funksiyaları mövcuddur. Dərmanların son istifadə tarixinin izlənilməsi, dozaj və təlimatların avtomatik göstərilməsi, həmçinin dərman qarşılıqlı təsirlərinin yoxlanılması aparılır.', NULL, 1, GETDATE()),
(4, N'Dərman Anbarı və Təchizat', N'Dərman anbarının idarə olunması, təchizatçılardan sifarişlərin verilməsi və dərmanların keyfiyyət yoxlaması funksiyaları mövcuddur. Soyuducu dərmanların temperatur izləməsi, dərman qruplarına görə təsnifat və avtomatik sifariş sistemi ilə anbarın idarə olunması təmin olunur.', NULL, 2, GETDATE()),
(4, N'Müştəri və Səhiyyə Xidmətləri', N'Müştəri məlumatlarının saxlanılması, dərman alerqiyalarının qeydiyyatı və müştəri səhiyyə tarixçəsinin izlənilməsi funksiyaları mövcuddur. Dərman xatırlatmaları, dozaj təlimatları və müştəri məsləhəti xidmətləri təmin olunur.', N'Səhiyyə təşkilatları ilə inteqrasiya, reçetələrin elektron göndərilməsi və dərman hesabatlarının hazırlanması funksiyaları mövcuddur. Dərman təhlükəsizliyi və keyfiyyət standartlarına uyğunluq izlənir.', 3, GETDATE()),
-- Ticarət və Anbar sections
(5, N'Böyük Həcmdə Mal Dövriyyəsi', N'Böyük həcmdə malların idarə olunması, konteyner və yük daşıma sistemlərinin koordinasiyası və logistika proseslərinin idarə edilməsi funksiyaları mövcuddur. Çoxlu anbar sistemlərinin inteqrasiyası, mal axınlarının izlənilməsi və avtomatik hesabatların hazırlanması təmin olunur.', NULL, 1, GETDATE()),
(5, N'Beynəlxalq Ticarət Əməliyyatları', N'İdxal-ixrac əməliyyatlarının idarə olunması, gömrük sənədlərinin hazırlanması və beynəlxalq standartlara uyğunluq funksiyaları mövcuddur. Valyuta hesablamaları, beynəlxalq ödəniş sistemləri və ticarət müqavilələrinin idarə olunması aparılır.', NULL, 2, GETDATE()),
(5, N'Kompleks Hesabat və Analiz', N'Çoxlu anbar sistemlərinin birləşdirilmiş hesabatları, mal dövriyyəsinin analizi və gəlir-zərər hesabatlarının hazırlanması funksiyaları mövcuddur. Real vaxtda məlumat analizi, trend izləmə və strategiya planlaşdırması üçün alətlər təmin olunur.', N'Avtomatik sifariş sistemi, təchizat zənciri optimizasiyası və mal itkisinin minimuma endirilməsi funksiyaları mövcuddur. Beynəlxalq standartlara uyğun keyfiyyət idarəetməsi və sertifikatlaşdırma prosesləri izlənir.', 3, GETDATE()),
-- Kredit və Lombard sections
(6, N'Kredit Əməliyyatları İdarəetməsi', N'Müxtəlif növ kreditlərin verilməsi, kredit müqavilələrinin hazırlanması və ödəniş cədvəllərinin idarə olunması funksiyaları mövcuddur. Kredit müraciətlərinin qiymətləndirilməsi, risk analizi və avtomatik hesablamalar aparılır. Müştəri kredit tarixçəsinin izlənilməsi və kredit limitlərinin təyin edilməsi təmin olunur.', NULL, 1, GETDATE()),
(6, N'Lombard və Təhlükəsizlik Əşyaları', N'Təhlükəsizlik əşyalarının qəbulu, qiymətləndirilməsi və saxlanılması funksiyaları mövcuddur. Əşyaların keyfiyyət yoxlaması, qiymət hesablaması və müqavilə şərtlərinin təyin edilməsi aparılır. Təhlükəsizlik sistemləri ilə inteqrasiya və əşyaların təhlükəsiz saxlanılması təmin olunur.', NULL, 2, GETDATE()),
(6, N'Risk İdarəetməsi və Hesabatlar', N'Kredit risklərinin qiymətləndirilməsi, müştəri etibarlılığının analizi və avtomatik xəbərdarlıq sistemlərinin idarə olunması funksiyaları mövcuddur. Maliyyə hesabatlarının hazırlanması, kredit portfelinin analizi və qanunvericiliyə uyğunluq izlənir.', N'Avtomatik ödəniş izləmə sistemi, gecikmiş ödənişlər üçün xəbərdarlıqlar və kredit yeniləmə prosesləri idarə olunur. Müştəri məlumatlarının təhlükəsizliyi və məlumatların şifrələnməsi təmin olunur.', 3, GETDATE());

-- Equipment
SET IDENTITY_INSERT Equipment ON;
INSERT INTO Equipment (Id, Name, Version, Core, Description, ImageUrl, CreatedAt) VALUES
(1, N'PosClass TX-1500S', N'J-1900', N'İntel Core I5', N'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', N'/assets/equipment1.png', GETDATE()),
(2, N'saPosClass TX-1500S', N'J-1900', N'İntel Core I5', N'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', N'/assets/equipment1.png', GETDATE()),
(3, N'PosClass TX-1500S', N'J-1900', N'İntel Core I5', N'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', N'/assets/equipment1.png', GETDATE());
SET IDENTITY_INSERT Equipment OFF;

-- Equipment Features
INSERT INTO EquipmentFeatures (EquipmentId, Feature, OrderIndex, CreatedAt) VALUES
(1, N'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(1, N'1 İl Rəsmi Zəmanət', 2, GETDATE()),
(1, N'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(1, N'10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE()),
(2, N'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(2, N'1 İl Rəsmi Zəmanət', 2, GETDATE()),
(2, N'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(2, N'10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE()),
(3, N'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(3, N'1 İl Rəsmi Zəmanət', 2, GETDATE()),
(3, N'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(3, N'10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE());

-- Equipment Specifications
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt) VALUES
-- Equipment 1
(1, N'Model', N'J-1900', 1, GETDATE()),
(1, N'Ekran Ölçüsü', N'15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(1, N'MultiTouch', N'10 barmaq', 3, GETDATE()),
(1, N'Prosessor', N'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(1, N'Yaddaş', N'4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(1, N'Saxlama', N'120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(1, N'Əməliyyat Sistemi', N'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(1, N'Qrafika', N'Intel HD Graphics 4000', 8, GETDATE()),
(1, N'Şəbəkə', N'10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(1, N'Portlar', N'4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(1, N'Enerji', N'12V DC, 65W Power Adapter', 11, GETDATE()),
(1, N'Ölçülər', N'400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(1, N'Çəki', N'2.5 kg', 13, GETDATE()),
-- Equipment 2 (same)
(2, N'Model', N'J-1900', 1, GETDATE()),
(2, N'Ekran Ölçüsü', N'15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(2, N'MultiTouch', N'10 barmaq', 3, GETDATE()),
(2, N'Prosessor', N'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(2, N'Yaddaş', N'4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(2, N'Saxlama', N'120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(2, N'Əməliyyat Sistemi', N'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(2, N'Qrafika', N'Intel HD Graphics 4000', 8, GETDATE()),
(2, N'Şəbəkə', N'10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(2, N'Portlar', N'4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(2, N'Enerji', N'12V DC, 65W Power Adapter', 11, GETDATE()),
(2, N'Ölçülər', N'400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(2, N'Çəki', N'2.5 kg', 13, GETDATE()),
-- Equipment 3 (same)
(3, N'Model', N'J-1900', 1, GETDATE()),
(3, N'Ekran Ölçüsü', N'15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(3, N'MultiTouch', N'10 barmaq', 3, GETDATE()),
(3, N'Prosessor', N'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(3, N'Yaddaş', N'4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(3, N'Saxlama', N'120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(3, N'Əməliyyat Sistemi', N'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(3, N'Qrafika', N'Intel HD Graphics 4000', 8, GETDATE()),
(3, N'Şəbəkə', N'10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(3, N'Portlar', N'4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(3, N'Enerji', N'12V DC, 65W Power Adapter', 11, GETDATE()),
(3, N'Ölçülər', N'400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(3, N'Çəki', N'2.5 kg', 13, GETDATE());

-- Sliders
SET IDENTITY_INSERT Sliders ON;
INSERT INTO Sliders (Id, Name, ImageUrl, OrderIndex, IsActive, CreatedAt) VALUES
(1, N'slider1', N'/assets/slider1.png', 1, 1, GETDATE()),
(2, N'slider2', N'/assets/slider2.png', 2, 1, GETDATE()),
(3, N'slider3', N'/assets/slider3.png', 3, 1, GETDATE()),
(4, N'slider4', N'/assets/slider4.png', 4, 1, GETDATE()),
(5, N'slider5', N'/assets/slider5.png', 5, 1, GETDATE()),
(6, N'slider6', N'/assets/slider6.png', 6, 1, GETDATE());
SET IDENTITY_INSERT Sliders OFF;

-- Employees (team)
SET IDENTITY_INSERT Employees ON;
INSERT INTO Employees (Id, Name, Position, ImageUrl, Phone, Email, LinkedIn, CreatedAt) VALUES
(1, N'Name Surname', N'Baş proqram tərtibatçısı', N'/assets/employee.png', N'+994 50 123 45 67', N'developer@company.com', N'linkedin.com/in/developer', GETDATE()),
(2, N'Name Surname', N'Layihə koordinatoru', N'/assets/employee.png', N'+994 50 123 45 68', N'coordinator@company.com', N'linkedin.com/in/coordinator', GETDATE()),
(3, N'Name Surname', N'Baş proqramçı', N'/assets/employee.png', N'+994 50 123 45 69', N'programmer@company.com', N'linkedin.com/in/programmer', GETDATE()),
(4, N'Name Surname', N'IT mütəxəssisi', N'/assets/employee.png', N'+994 50 123 45 70', N'specialist@company.com', N'linkedin.com/in/specialist', GETDATE()),
(5, N'Name Surname', N'Layihələr üzrə şöbə rəhbəri', N'/assets/employee.png', N'+994 50 123 45 71', N'manager@company.com', N'linkedin.com/in/manager', GETDATE()),
(6, N'Name Surname', N'Layihə meneceri', N'/assets/employee.png', N'+994 50 123 45 72', N'project-manager@company.com', N'linkedin.com/in/project-manager', GETDATE()),
(7, N'Name Surname', N'SQL Server üzrə proqramçı', N'/assets/employee.png', N'+994 50 123 45 73', N'sql-developer@company.com', N'linkedin.com/in/sql-developer', GETDATE());
SET IDENTITY_INSERT Employees OFF;

-- References (logos)
SET IDENTITY_INSERT [References] ON;
INSERT INTO [References] (Id, Name, ImageUrl, Alt, CreatedAt) VALUES
(1, N'Logo 1', N'/assets/logo1.png', N'Company Logo 1', GETDATE()),
(2, N'Logo 2', N'/assets/logo2.png', N'Company Logo 2', GETDATE()),
(3, N'Logo 3', N'/assets/logo3.png', N'Company Logo 3', GETDATE()),
(4, N'Logo 4', N'/assets/logo4.png', N'Company Logo 4', GETDATE()),
(5, N'Logo 5', N'/assets/logo5.png', N'Company Logo 5', GETDATE()),
(6, N'Logo 6', N'/assets/logo6.png', N'Company Logo 6', GETDATE()),
(7, N'Logo 7', N'/assets/logo7.png', N'Company Logo 7', GETDATE()),
(8, N'Logo 8', N'/assets/logo8.png', N'Company Logo 8', GETDATE()),
(9, N'Logo 9', N'/assets/logo9.png', N'Company Logo 9', GETDATE()),
(10, N'Logo 10', N'/assets/logo10.png', N'Company Logo 10', GETDATE()),
(11, N'Logo 11', N'/assets/logo11.png', N'Company Logo 11', GETDATE()),
(12, N'Logo 12', N'/assets/logo12.png', N'Company Logo 12', GETDATE()),
(13, N'Logo 13', N'/assets/logo13.png', N'Company Logo 13', GETDATE()),
(14, N'Logo 14', N'/assets/logo14.png', N'Company Logo 14', GETDATE()),
(15, N'Logo 15', N'/assets/logo15.png', N'Company Logo 15', GETDATE()),
(16, N'Logo 16', N'/assets/logo16.png', N'Company Logo 16', GETDATE()),
(17, N'Logo 17', N'/assets/logo17.png', N'Company Logo 17', GETDATE()),
(18, N'Logo 18', N'/assets/logo18.png', N'Company Logo 18', GETDATE()),
(19, N'Logo 19', N'/assets/logo19.png', N'Company Logo 19', GETDATE()),
(20, N'Logo 20', N'/assets/logo20.png', N'Company Logo 20', GETDATE()),
(21, N'Logo 21', N'/assets/logo21.png', N'Company Logo 21', GETDATE()),
(22, N'Logo 22', N'/assets/logo22.png', N'Company Logo 22', GETDATE()),
(23, N'Logo 23', N'/assets/logo23.png', N'Company Logo 23', GETDATE()),
(24, N'Logo 24', N'/assets/logo24.png', N'Company Logo 24', GETDATE()),
(25, N'Logo 25', N'/assets/logo25.png', N'Company Logo 25', GETDATE());
SET IDENTITY_INSERT [References] OFF;

COMMIT;

-- Verify
SELECT COUNT(*) AS Products FROM Products;
SELECT COUNT(*) AS ProductSections FROM ProductSections;
SELECT COUNT(*) AS Equipment FROM Equipment;
SELECT COUNT(*) AS EquipmentFeatures FROM EquipmentFeatures;
SELECT COUNT(*) AS EquipmentSpecifications FROM EquipmentSpecifications;
SELECT COUNT(*) AS Sliders FROM Sliders;
SELECT COUNT(*) AS Employees FROM Employees;
SELECT COUNT(*) AS [References] FROM [References];
