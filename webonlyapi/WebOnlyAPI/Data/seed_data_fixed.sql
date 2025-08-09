-- SQL Script to seed database with data from JavaScript files
-- Run this script in SQL Server Management Studio or via sqlcmd

-- Clear existing data (optional - uncomment if you want to start fresh)
-- DELETE FROM ServiceArticles;
-- DELETE FROM ProductSections;
-- DELETE FROM EquipmentFeatures;
-- DELETE FROM EquipmentSpecifications;
-- DELETE FROM Services;
-- DELETE FROM Products;
-- DELETE FROM Equipment;
-- DELETE FROM Sliders;

-- Insert Products (without explicit IDs - let identity handle it)
INSERT INTO Products (Name, Subtext, Icon, Alt, Path, MainImage, Description, ImageUrl, CreatedAt) VALUES
('Market', 'Satış və anbar', '/assets/market-icon.png', 'Market', '/market', '/assets/market1.png', 'Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Barkodlu Mal Sərgiləyən Və Tətbiqini Həyata Keçirərək Müştərinin Tələblərinə Daha Sürətli Cavab Verəcək Və Anbarınızı Nəzarətdə Saxlaya Biləcəksiniz.', NULL, GETDATE()),
('Tekstil Modulu', 'İstehsal və toxuculuq', '/assets/textile.png', 'Tekstil', '/textile', '/assets/market1.png', 'Tekstil Modulunuz Pambıqdan Başlayaraq Hazır Məhsula Qədər Bütün İstehsal Proseslərini İdarə Edə, Material Əsasında Xərc Və Qazanc Hesabatlarını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Toxuculuq Və Tikiş Emalatxanalarınızı Rəqəmsallaşdıraraq İstehsal Səviyyənizi Artıra Biləcəksiniz.', NULL, GETDATE()),
('Mobil satış', 'Mobil satış nöqtələri', '/assets/mobile.png', 'Mobil', '/mobile', '/assets/market1.png', 'Mobil Satış Modulunuz Satıcılarınızın Hər Yerdə Satış Əməliyyatlarını Həyata Keçirməsinə İmkan Verə, Real Vaxtda Mərkəzi Sistemlə Sinkronlaşdıra Bilər. Bu Proqram Vasitəsilə Siz Mobil Satış Nöqtələrini Genişləndirərək Satış Həcminizi Artıra Biləcəksiniz.', NULL, GETDATE()),
('Aptek İdarəetmə sistemi', 'Dərman və reçetə', '/assets/medicine.png', 'Aptek', '/medicine', '/assets/market1.png', 'Aptek İdarəetmə Sistemi Dərmanların Satışından Tutmuş Reçetə İdarəetməsinə Qədər Bütün Prosesləri Avtomatlaşdıraraq Təhlükəsiz və Səmərəli İdarəetmə Təmin Edir. Bu Proqram Vasitəsilə Siz Dərman Təhlükəsizliyini Təmin Edərək Müştərilərinə Keyfiyyətli Xidmət Göstərə Biləcəksiniz.', NULL, GETDATE()),
('Ticarət və Anbar', 'Böyük həcmli ticarət', '/assets/factory.png', 'Fabrika', '/factory', '/assets/market1.png', 'Ticarət və Anbar Modulunuz Böyük Həcmdə Mal Dövriyyəsinin İdarə Olunması, Çoxlu Anbar Sistemlərinin Koordinasiyası və Beynəlxalq Ticarət Əməliyyatlarının Həyata Keçirilməsi Üçün Nəzərdə Tutulub. Bu Proqram Vasitəsilə Siz Kompleks Ticarət Əməliyyatlarınızı Səmərəli Şəkildə İdarə Edə Biləcəksiniz.', NULL, GETDATE()),
('Kredit və Lombard', 'Maliyyə xidmətləri', '/assets/credit.png', 'Kredit', '/credit', '/assets/market1.png', 'Kredit və Lombard Modulunuz Müxtəlif Növ Kredit Xidmətlərinin Təqdim Edilməsi, Təhlükəsizlik Əşyalarının İdarə Olunması və Risk İdarəetməsi Funksiyalarını Birləşdirir. Bu Proqram Vasitəsilə Siz Maliyyə Xidmətlərinizi Təhlükəsiz və Səmərəli Şəkildə İdarə Edə Biləcəksiniz.', NULL, GETDATE());

-- Insert Product Sections (using the actual Product IDs that were generated)
INSERT INTO ProductSections (ProductId, Title, Description, MoreText, OrderIndex, CreatedAt) VALUES
-- Market sections (ProductId = 1)
(1, 'Satış və Kassa İdarəetməsi', 'Satış nöqtəsinin idarə olunması, satış tempinə nəzarət və müxtəlif mal qruplarına görə çeşidləmə imkanı mövcuddur. Endirimlər mal, şöbə, tarix və saata əsasən təyin edilə bilər. Barkodlu satış, çəki və ədədə görə əməliyyatlar, barkodlu tərəzi ilə inteqrasiya mümkündür. Satış faizi ilə avtomatik qiymət hesablana bilər. Alış-veriş statistikası izlənir, sensorlu ekran dəstəyi və müştəriyə dərhal faktura verilməsi təmin olunur.', 'Kassalara limitsiz kassir təyin etmək, günlük hesabatlar hazırlamaq, nağd və bank hesabları arası köçürmələri izləmək, qaytarma və ləğv əməliyyatlarını hesabatlarda göstərmək mümkündür.', 1, GETDATE()),
(1, 'Müştəri və CRM İdarəetməsi', 'Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər. Alış-veriş tarixçəsinə əsasən müştəriləri qruplaşdırmaq və analiz etmək mümkündür. Şikayət və təkliflər toplanır, fərdi qiymət və endirim kartları təyin olunur.', NULL, 2, GETDATE()),
(1, 'Təchizat və Anbar İdarəetməsi', 'Anbarlarda mal qrupları üzrə statistika, giriş-çıxış sənədləri və transferlər idarə olunur. Mağaza və anbarlara görə qalıqlar izlənir, avtomatik sənədləşmə aparılır. Barkodlu mobil cihaz dəstəyi, satış və maya dəyərinin analiz olunması, həmçinin avtomatik sayma funksiyası ilə mal itkisinə nəzarət mümkündür.', 'Satınalma sifarişləri mərhələli şəkildə qəbul edilir, valyuta seçimi və e-poçtla təchizatçılara göndərmək mümkündür. Qaytarma, dəyişdirmə və hesablaşmalar təqib olunur.', 3, GETDATE()),

-- Tekstil sections (ProductId = 2)
(2, 'İstehsal və Texnologiya İdarəetməsi', 'İstehsal proseslərinin planlaşdırılması, texnologiya axınlarının idarə olunması və keyfiyyət nəzarəti funksiyaları mövcuddur. Material tələbatının hesablanması, istehsal cədvəllərinin hazırlanması və avtomatik sifariş sistemi ilə təchizat idarə olunur. Toxuculuq və tikiş avadanlıqlarının texniki xidməti izlənir, istehsal standartları təyin edilir.', NULL, 1, GETDATE()),
(2, 'Material və Anbar İdarəetməsi', 'Xammal və yarımfabrikatların anbar idarəetməsi, material axınlarının izlənilməsi və keyfiyyət yoxlaması aparılır. Rəng və ölçü çeşidlərinin idarə olunması, material itkisinin minimuma endirilməsi və avtomatik hesabatlar hazırlanır.', NULL, 2, GETDATE()),
(2, 'Satış və Müştəri İdarəetməsi', 'Hazır məhsulların satışı, müştəri sifarişlərinin idarə olunması və çatdırılma prosesləri izlənir. Müştəri tələblərinə uyğun məhsul dizaynı, ölçü və rəng seçimləri, həmçinin keyfiyyət zəmanəti xidmətləri təmin olunur.', 'E-ticarət platformaları ilə inteqrasiya, onlayn sifariş sistemi və avtomatik qiymət hesablama funksiyaları mövcuddur. Müştəri məmnuniyyəti və geri qaytarma prosesləri idarə olunur.', 3, GETDATE()),

-- Mobil satış sections (ProductId = 3)
(3, 'Mobil Satış Nöqtələri', 'Mobil cihazlar vasitəsilə satış əməliyyatlarının həyata keçirilməsi, barkod skan etmə və QR kod oxuma funksiyaları mövcuddur. Nağd və kart ödənişləri, endirim və bonus sistemləri, həmçinin müştəri məlumatlarının dərhal qeydiyyatı təmin olunur.', NULL, 1, GETDATE()),
(3, 'Real Vaxt Sinkronizasiyası', 'Mobil satış nöqtələri ilə mərkəzi sistem arasında real vaxtda məlumat mübadiləsi, anbar qalıqlarının avtomatik yenilənməsi və satış hesabatlarının dərhal hazırlanması funksiyaları mövcuddur.', NULL, 2, GETDATE()),
(3, 'Mobil Anbar İdarəetməsi', 'Mobil cihazlarla anbar əməliyyatlarının idarə olunması, mal qəbulu və çıxarılması, inventar sayımı və avtomatik hesabatların hazırlanması funksiyaları mövcuddur.', 'GPS izləmə sistemi ilə satıcıların hərəkətlərinin izlənilməsi, satış nöqtələrinin xəritədə göstərilməsi və performans analizi aparılır. Offline rejimdə işləmə imkanı və məlumatların avtomatik sinxronlaşdırılması təmin olunur.', 3, GETDATE()),

-- Aptek sections (ProductId = 4)
(4, 'Dərman Satışı və Reçetə İdarəetməsi', 'Reçetəli və reçetəsiz dərman satışının idarə olunması, reçetələrin elektron qeydiyyatı və dərman təhlükəsizliyinin təmin edilməsi funksiyaları mövcuddur. Dərmanların son istifadə tarixinin izlənilməsi, dozaj və təlimatların avtomatik göstərilməsi, həmçinin dərman qarşılıqlı təsirlərinin yoxlanılması aparılır.', NULL, 1, GETDATE()),
(4, 'Dərman Anbarı və Təchizat', 'Dərman anbarının idarə olunması, təchizatçılardan sifarişlərin verilməsi və dərmanların keyfiyyət yoxlaması funksiyaları mövcuddur. Soyuducu dərmanların temperatur izləməsi, dərman qruplarına görə təsnifat və avtomatik sifariş sistemi ilə anbarın idarə olunması təmin olunur.', NULL, 2, GETDATE()),
(4, 'Müştəri və Səhiyyə Xidmətləri', 'Müştəri məlumatlarının saxlanılması, dərman alerqiyalarının qeydiyyatı və müştəri səhiyyə tarixçəsinin izlənilməsi funksiyaları mövcuddur. Dərman xatırlatmaları, dozaj təlimatları və müştəri məsləhəti xidmətləri təmin olunur.', 'Səhiyyə təşkilatları ilə inteqrasiya, reçetələrin elektron göndərilməsi və dərman hesabatlarının hazırlanması funksiyaları mövcuddur. Dərman təhlükəsizliyi və keyfiyyət standartlarına uyğunluq izlənir.', 3, GETDATE()),

-- Ticarət və Anbar sections (ProductId = 5)
(5, 'Böyük Həcmdə Mal Dövriyyəsi', 'Böyük həcmdə malların idarə olunması, konteyner və yük daşıma sistemlərinin koordinasiyası və logistika proseslərinin idarə edilməsi funksiyaları mövcuddur. Çoxlu anbar sistemlərinin inteqrasiyası, mal axınlarının izlənilməsi və avtomatik hesabatların hazırlanması təmin olunur.', NULL, 1, GETDATE()),
(5, 'Beynəlxalq Ticarət Əməliyyatları', 'İdxal-ixrac əməliyyatlarının idarə olunması, gömrük sənədlərinin hazırlanması və beynəlxalq standartlara uyğunluq funksiyaları mövcuddur. Valyuta hesablamaları, beynəlxalq ödəniş sistemləri və ticarət müqavilələrinin idarə olunması aparılır.', NULL, 2, GETDATE()),
(5, 'Kompleks Hesabat və Analiz', 'Çoxlu anbar sistemlərinin birləşdirilmiş hesabatları, mal dövriyyəsinin analizi və gəlir-zərər hesabatlarının hazırlanması funksiyaları mövcuddur. Real vaxtda məlumat analizi, trend izləmə və strategiya planlaşdırması üçün alətlər təmin olunur.', 'Avtomatik sifariş sistemi, təchizat zənciri optimizasiyası və mal itkisinin minimuma endirilməsi funksiyaları mövcuddur. Beynəlxalq standartlara uyğun keyfiyyət idarəetməsi və sertifikatlaşdırma prosesləri izlənir.', 3, GETDATE()),

-- Kredit və Lombard sections (ProductId = 6)
(6, 'Kredit Əməliyyatları İdarəetməsi', 'Müxtəlif növ kreditlərin verilməsi, kredit müqavilələrinin hazırlanması və ödəniş cədvəllərinin idarə olunması funksiyaları mövcuddur. Kredit müraciətlərinin qiymətləndirilməsi, risk analizi və avtomatik hesablamalar aparılır. Müştəri kredit tarixçəsinin izlənilməsi və kredit limitlərinin təyin edilməsi təmin olunur.', NULL, 1, GETDATE()),
(6, 'Lombard və Təhlükəsizlik Əşyaları', 'Təhlükəsizlik əşyalarının qəbulu, qiymətləndirilməsi və saxlanılması funksiyaları mövcuddur. Əşyaların keyfiyyət yoxlaması, qiymət hesablaması və müqavilə şərtlərinin təyin edilməsi aparılır. Təhlükəsizlik sistemləri ilə inteqrasiya və əşyaların təhlükəsiz saxlanılması təmin olunur.', NULL, 2, GETDATE()),
(6, 'Risk İdarəetməsi və Hesabatlar', 'Kredit risklərinin qiymətləndirilməsi, müştəri etibarlılığının analizi və avtomatik xəbərdarlıq sistemlərinin idarə olunması funksiyaları mövcuddur. Maliyyə hesabatlarının hazırlanması, kredit portfelinin analizi və qanunvericiliyə uyğunluq izlənir.', 'Avtomatik ödəniş izləmə sistemi, gecikmiş ödənişlər üçün xəbərdarlıqlar və kredit yeniləmə prosesləri idarə olunur. Müştəri məlumatlarının təhlükəsizliyi və məlumatların şifrələnməsi təmin olunur.', 3, GETDATE());

-- Insert Services (without explicit IDs)
INSERT INTO Services (Name, Subtitle, Icon, DetailImage, Description, Subtext, ImageUrl, CreatedAt) VALUES
('Bazanın arxivlənməsi', 'Arxivləmə', '/assets/service1.png', '/assets/servicesDetail1.png', 'Arxivləmə prosesi sistemdəki məlumatların təhlükəsizliyini və davamlılığını təmin etmək üçün vacib funksiyadır. Bu modul vasitəsilə məlumatlar müəyyən dövrlərdə avtomatik və ya əl ilə arxivlənə bilər. Arxivlənmiş fayllar ehtiyac olduqda tez bir zamanda bərpa edilə bilir. Bu, həm yaddaşdan səmərəli istifadəni, həm də fövqəladə hallarda məlumat itkisinə qarşı qorumanı təmin edir. Eyni zamanda sistemin yüklənməsinin qarşısını alaraq ümumi performansı artırır.', NULL, NULL, GETDATE()),
('Logların saxlanılması', 'Loglama', '/assets/service2.png', '/assets/servicesDetail2.png', 'Loglama sistemi bütün sistem əməliyyatlarının detallı qeydiyyatını saxlayır. Bu modul vasitəsilə istifadəçi hərəkətləri, sistem hadisələri və xətalar avtomatik olaraq qeydə alınır. Loglar təhlükəsizlik auditləri, problemlərin həlli və sistemin performansının izlənilməsi üçün vacibdir. Məlumatlar müəyyən müddət saxlanılır və lazım olduqda axtarış və analiz edilə bilər.', NULL, NULL, GETDATE()),
('Hesabatların e-poçt göndərilməsi', 'E-poçt', '/assets/service3.png', '/assets/servicesDetail3.png', 'E-poçt modulu hesabatların avtomatik olaraq müəyyən istifadəçilərə göndərilməsini təmin edir. Sistem müəyyən dövrlərdə və ya hadisələr baş verdikdə hesabatları hazırlayır və təyin edilmiş e-poçt ünvanlarına göndərir. Bu, idarəetmə qərarlarının qəbul edilməsi üçün vaxtında məlumat əldə etməyi təmin edir və manual hesabat göndərmə prosesini avtomatlaşdırır.', NULL, NULL, GETDATE()),
('Mobil hesabatlar', 'Mobil hesabatlar', '/assets/service4.png', '/assets/servicesDetail4.png', 'Mobil hesabatlar modulu istifadəçilərə mobil cihazlar vasitəsilə sistem məlumatlarına daxil olmaq imkanı verir. Bu modul responsive dizayn prinsiplərinə əsaslanır və müxtəlif ekran ölçülərinə uyğunlaşır. İstifadəçilər hər yerdən hesabatlara baxa, məlumatları analiz edə və vacib göstəriciləri izləyə bilərlər.', NULL, NULL, GETDATE()),
('Bazanın nüsxəsinin alınması', 'Nüsxələmə', '/assets/service5.png', '/assets/servicesDetail5.png', 'Nüsxələmə modulu verilənlər bazasının tam və ya qismən nüsxələrini almaq üçün istifadə olunur. Bu proses məlumatların təhlükəsizliyini təmin edir və sistem bərpası üçün vacibdir. Nüsxələr müəyyən dövrlərdə avtomatik olaraq və ya əl ilə alına bilər. Nüsxələnmiş fayllar təhlükəsiz şəkildə saxlanılır və lazım olduqda bərpa edilə bilər.', NULL, NULL, GETDATE()),
('Bonus modulunun tətbiqi', 'Bonus modulu', '/assets/service6.png', '/assets/servicesDetail6.png', 'Bonus modulu işçilərin performansını artırmaq və motivasiyalarını yüksəltmək üçün nəzərdə tutulmuşdur. Bu modul vasitəsilə müxtəlif bonus növləri təyin edilə bilər və avtomatik hesablanır. Sistem işçilərin nailiyyətlərini izləyir və müəyyən kriteriyalara əsaslanaraq bonusları hesablayır. Bu, ədalətli və şəffaf bonus sistemi yaradır.', NULL, NULL, GETDATE()),
('Hesabatların hazırlanması', 'Hesabatlar', '/assets/service7.png', '/assets/servicesDetail7.png', 'Hesabatlar modulu müxtəlif növ hesabatların hazırlanması və təqdim edilməsi üçün istifadə olunur. Sistem məlumatlarından avtomatik olaraq hesabatlar yaradır və müxtəlif formatlarda (PDF, Excel, HTML) ixrac edə bilər. Hesabatlar müəyyən dövrlərdə və ya real vaxtda hazırlana bilər və idarəetmə qərarları üçün vacib məlumatlar təqdim edir.', NULL, NULL, GETDATE()),
('Əməliyyat sisteminin yazılması', 'Əməliyyat sistemi', '/assets/service8.png', '/assets/servicesDetail8.png', 'Əməliyyat sistemi modulu müəssisənin əsas biznes proseslərini idarə etmək üçün nəzərdə tutulmuşdur. Bu modul vasitəsilə müxtəlif əməliyyatlar avtomatlaşdırılır və izlənilir. Sistem iş axınlarını idarə edir, tapşırıqları paylayır və proseslərin effektivliyini artırır. Bu, əməliyyatların daha sürətli və dəqiq yerinə yetirilməsini təmin edir.', NULL, NULL, GETDATE()),
('Sistemin audit olunması', 'Audit', '/assets/service9.png', '/assets/servicesDetail9.png', 'Audit modulu sistemin təhlükəsizliyini və performansını qiymətləndirmək üçün istifadə olunur. Bu modul vasitəsilə sistem əməliyyatları, istifadəçi hərəkətləri və təhlükəsizlik hadisələri izlənilir və analiz edilir. Audit hesabatları sistemin uyğunluğunu yoxlayır və təkmilləşdirmə təklifləri təqdim edir. Bu, sistemin etibarlılığını və təhlükəsizliyini təmin edir.', NULL, NULL, GETDATE());

-- Insert Service Articles (only for service with ID 2 - Logların saxlanılması)
INSERT INTO ServiceArticles (ServiceId, Number, Title, Description, OrderIndex, CreatedAt) VALUES
(2, '01', 'Identify & Monitor Your Data', 'Verilənlərin buludda, mobil qurğuda və lokal mühitlərdə aşkarlanması və istifadəsinin izlənməsi imkanı təmin olunur.', 1, GETDATE()),
(2, '02', 'Real-time Analytics', 'Sistem məlumatlarının real vaxtda analizi və hesabatların avtomatik hazırlanması funksiyası.', 2, GETDATE()),
(2, '03', 'Security Monitoring', 'Təhlükəsizlik hadisələrinin izlənilməsi və avtomatik xəbərdarlıq sistemlərinin idarə edilməsi.', 3, GETDATE());

-- Insert Equipment (without explicit IDs)
INSERT INTO Equipment (Name, Version, Core, Description, ImageUrl, CreatedAt) VALUES
('PosClass TX-1500S', 'J-1900', 'İntel Core I5', 'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', '/assets/equipment1.png', GETDATE()),
('saPosClass TX-1500S', 'J-1900', 'İntel Core I5', 'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', '/assets/equipment1.png', GETDATE()),
('PosClass TX-1500S', 'J-1900', 'İntel Core I5', 'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', '/assets/equipment1.png', GETDATE());

-- Insert Equipment Features (using the actual Equipment IDs that were generated)
INSERT INTO EquipmentFeatures (EquipmentId, Feature, OrderIndex, CreatedAt) VALUES
-- Equipment 1 features
(1, 'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(1, '1 İl Rəsmi Zəmanət', 2, GETDATE()),
(1, 'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(1, '10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE()),

-- Equipment 2 features
(2, 'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(2, '1 İl Rəsmi Zəmanət', 2, GETDATE()),
(2, 'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(2, '10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE()),

-- Equipment 3 features
(3, 'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(3, '1 İl Rəsmi Zəmanət', 2, GETDATE()),
(3, 'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(3, '10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE());

-- Insert Equipment Specifications (using the actual Equipment IDs that were generated)
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt) VALUES
-- Equipment 1 specifications
(1, 'Model', 'J-1900', 1, GETDATE()),
(1, 'Ekran Ölçüsü', '15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(1, 'MultiTouch', '10 barmaq', 3, GETDATE()),
(1, 'Prosessor', 'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(1, 'Yaddaş', '4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(1, 'Saxlama', '120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(1, 'Əməliyyat Sistemi', 'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(1, 'Qrafika', 'Intel HD Graphics 4000', 8, GETDATE()),
(1, 'Şəbəkə', '10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(1, 'Portlar', '4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(1, 'Enerji', '12V DC, 65W Power Adapter', 11, GETDATE()),
(1, 'Ölçülər', '400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(1, 'Çəki', '2.5 kg', 13, GETDATE()),

-- Equipment 2 specifications (same as equipment 1)
(2, 'Model', 'J-1900', 1, GETDATE()),
(2, 'Ekran Ölçüsü', '15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(2, 'MultiTouch', '10 barmaq', 3, GETDATE()),
(2, 'Prosessor', 'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(2, 'Yaddaş', '4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(2, 'Saxlama', '120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(2, 'Əməliyyat Sistemi', 'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(2, 'Qrafika', 'Intel HD Graphics 4000', 8, GETDATE()),
(2, 'Şəbəkə', '10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(2, 'Portlar', '4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(2, 'Enerji', '12V DC, 65W Power Adapter', 11, GETDATE()),
(2, 'Ölçülər', '400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(2, 'Çəki', '2.5 kg', 13, GETDATE()),

-- Equipment 3 specifications (same as equipment 1)
(3, 'Model', 'J-1900', 1, GETDATE()),
(3, 'Ekran Ölçüsü', '15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(3, 'MultiTouch', '10 barmaq', 3, GETDATE()),
(3, 'Prosessor', 'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(3, 'Yaddaş', '4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(3, 'Saxlama', '120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(3, 'Əməliyyat Sistemi', 'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(3, 'Qrafika', 'Intel HD Graphics 4000', 8, GETDATE()),
(3, 'Şəbəkə', '10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(3, 'Portlar', '4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(3, 'Enerji', '12V DC, 65W Power Adapter', 11, GETDATE()),
(3, 'Ölçülər', '400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(3, 'Çəki', '2.5 kg', 13, GETDATE());

-- Insert Sliders (without explicit IDs)
INSERT INTO Sliders (Name, ImageUrl, OrderIndex, IsActive, CreatedAt) VALUES
('slider1', '/assets/slider1.png', 1, 1, GETDATE()),
('slider2', '/assets/slider2.png', 2, 1, GETDATE()),
('slider3', '/assets/slider3.png', 3, 1, GETDATE()),
('slider4', '/assets/slider4.png', 4, 1, GETDATE()),
('slider5', '/assets/slider5.png', 5, 1, GETDATE()),
('slider6', '/assets/slider6.png', 6, 1, GETDATE());
