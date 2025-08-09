SET XACT_ABORT ON;
BEGIN TRAN;

IF OBJECT_ID(N'[ProductImages]', N'U') IS NOT NULL
    DROP TABLE [ProductImages];

IF OBJECT_ID(N'[ProductSections]', N'U') IS NOT NULL
    DROP TABLE [ProductSections];

IF OBJECT_ID(N'[Products]', N'U') IS NOT NULL
    DROP TABLE [Products];

CREATE TABLE [Products] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(100) NOT NULL,
    [Subtext] NVARCHAR(1000) NULL,
    [Icon] NVARCHAR(100) NULL,
    [Alt] NVARCHAR(100) NULL,
    [Path] NVARCHAR(100) NULL,
    [MainImage] NVARCHAR(500) NULL,
    [Description] NVARCHAR(2000) NULL,
    [ImageUrl] NVARCHAR(500) NULL,
    [DetailDescription] NVARCHAR(MAX) NULL,
    [Section1Description] NVARCHAR(MAX) NULL,
    [Section2Description] NVARCHAR(MAX) NULL,
    [Section3Description] NVARCHAR(MAX) NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    [UpdatedAt] DATETIME2 NULL
);

CREATE TABLE [ProductImages] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [ProductId] INT NOT NULL,
    [ImageUrl] NVARCHAR(500) NOT NULL,
    [Alt] NVARCHAR(100) NULL,
    [OrderIndex] INT NOT NULL,
    CONSTRAINT [FK_ProductImages_Products_ProductId] FOREIGN KEY ([ProductId])
        REFERENCES [Products]([Id]) ON DELETE CASCADE
);

-- Seed Products (IDs preserved)
SET IDENTITY_INSERT [Products] ON;
INSERT INTO [Products] ([Id],[Name],[Subtext],[Icon],[Alt],[Path],[MainImage],[Description],[ImageUrl],[DetailDescription],[Section1Description],[Section2Description],[Section3Description],[CreatedAt]) VALUES
(1,N'Market',N'Satış və anbar',N'/assets/market-icon.png',N'Market',N'/market',N'/assets/market1.png',N'Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Barkodlu Mal Sərgiləyən Və Tətbiqini Həyata Keçirərək Müştərinin Tələblərinə Daha Sürətli Cavab Verəcək Və Anbarınızı Nəzarətdə Saxlaya Biləcəksiniz.',NULL,
 N'Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Barkodlu Mal Sərgiləyən Və Tətbiqini Həyata Keçirərək Müştərinin Tələblərinə Daha Sürətli Cavab Verəcək Və Anbarınızı Nəzarətdə Saxlaya Biləcəksiniz.',
 N'Satış nöqtəsinin idarə olunması, satış tempinə nəzarət və müxtəlif mal qruplarına görə çeşidləmə imkanı mövcuddur. Endirimlər mal, şöbə, tarix və saata əsasən təyin edilə bilər. Barkodlu satış, çəki və ədədə görə əməliyyatlar, barkodlu tərəzi ilə inteqrasiya mümkündür. Satış faizi ilə avtomatik qiymət hesablana bilər. Alış-veriş statistikası izlənir, sensorlu ekran dəstəyi və müştəriyə dərhal faktura verilməsi təmin olunur.',
 N'Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər. Alış-veriş tarixçəsinə əsasən müştəriləri qruplaşdırmaq və analiz etmək mümkündür. Şikayət və təkliflər toplanır, fərdi qiymət və endirim kartları təyin olunur.',
 N'Anbarlarda mal qrupları üzrə statistika, giriş-çıxış sənədləri və transferlər idarə olunur. Mağaza və anbarlara görə qalıqlar izlənir, avtomatik sənədləşmə aparılır. Barkodlu mobil cihaz dəstəyi, satış və maya dəyərinin analiz olunması, həmçinin avtomatik sayma funksiyası ilə mal itkisinə nəzarət mümkündür. Satınalma sifarişləri mərhələli şəkildə qəbul edilir, valyuta seçimi və e-poçtla təchizatçılara göndərmək mümkündür. Qaytarma, dəyişdirmə və hesablaşmalar təqib olunur.', SYSUTCDATETIME()),
(2,N'Tekstil Modulu',N'İstehsal və toxuculuq',N'/assets/textile.png',N'Tekstil',N'/textile',N'/assets/market1.png',N'Tekstil Modulunuz Pambıqdan Başlayaraq Hazır Məhsula Qədər Bütün İstehsal Proseslərini İdarə Edə, Material Əsasında Xərc Və Qazanc Hesabatlarını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Toxuculuq Və Tikiş Emalatxanalarınızı Rəqəmsallaşdıraraq İstehsal Səviyyənizi Artıra Biləcəksiniz.',NULL,
 N'Tekstil Modulunuz Pambıqdan Başlayaraq Hazır Məhsula Qədər Bütün İstehsal Proseslərini İdarə Edə, Material Əsasında Xərc Və Qazanc Hesabatlarını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Toxuculuq Və Tikiş Emalatxanalarınızı Rəqəmsallaşdıraraq İstehsal Səviyyənizi Artıra Biləcəksiniz.',
 N'İstehsal proseslərinin planlaşdırılması, texnologiya axınlarının idarə olunması və keyfiyyət nəzarəti funksiyaları mövcuddur. Material tələbatının hesablanması, istehsal cədvəllərinin hazırlanması və avtomatik sifariş sistemi ilə təchizat idarə olunur. Toxuculuq və tikiş avadanlıqlarının texniki xidməti izlənir, istehsal standartları təyin edilir.',
 N'Xammal və yarımfabrikatların anbar idarəetməsi, material axınlarının izlənilməsi və keyfiyyət yoxlaması aparılır. Rəng və ölçü çeşidlərinin idarə olunması, material itkisinin minimuma endirilməsi və avtomatik hesabatlar hazırlanır.',
 N'Hazır məhsulların satışı, müştəri sifarişlərinin idarə olunması və çatdırılma prosesləri izlənir. Müştəri tələblərinə uyğun məhsul dizaynı, ölçü və rəng seçimləri, həmçinin keyfiyyət zəmanəti xidmətləri təmin olunur. E-ticarət platformaları ilə inteqrasiya, onlayn sifariş sistemi və avtomatik qiymət hesablama funksiyaları mövcuddur. Müştəri məmnuniyyəti və geri qaytarma prosesləri idarə olunur.', SYSUTCDATETIME()),
(3,N'Mobil satış',N'Mobil satış nöqtələri',N'/assets/mobile.png',N'Mobil',N'/mobile',N'/assets/market1.png',N'Mobil Satış Modulunuz Satıcılarınızın Hər Yerdə Satış Əməliyyatlarını Həyata Keçirməsinə İmkan Verə, Real Vaxtda Mərkəzi Sistemlə Sinkronlaşdıra Bilər. Bu Proqram Vasitəsilə Siz Mobil Satış Nöqtələrini Genişləndirərək Satış Həcminizi Artıra Biləcəksiniz.',NULL,
 N'Mobil Satış Modulunuz Satıcılarınızın Hər Yerdə Satış Əməliyyatlarını Həyata Keçirməsinə İmkan Verə, Real Vaxtda Mərkəzi Sistemlə Sinkronlaşdıra Bilər. Bu Proqram Vasitəsilə Siz Mobil Satış Nöqtələrini Genişləndirərək Satış Həcminizi Artıra Biləcəksiniz.',
 N'Mobil cihazlar vasitəsilə satış əməliyyatlarının həyata keçirilməsi, barkod skan etmə və QR kod oxuma funksiyaları mövcuddur. Nağd və kart ödənişləri, endirim və bonus sistemləri, həmçinin müştəri məlumatlarının dərhal qeydiyyatı təmin olunur.',
 N'Mobil satış nöqtələri ilə mərkəzi sistem arasında real vaxtda məlumat mübadiləsi, anbar qalıqlarının avtomatik yenilənməsi və satış hesabatlarının dərhal hazırlanması funksiyaları mövcuddur.',
 N'Mobil cihazlarla anbar əməliyyatlarının idarə olunması, mal qəbulu və çıxarılması, inventar sayımı və avtomatik hesabatların hazırlanması funksiyaları mövcuddur. GPS izləmə sistemi ilə satıcıların hərəkətlərinin izlənilməsi, satış nöqtələrinin xəritədə göstərilməsi və performans analizi aparılır. Offline rejimdə işləmə imkanı və məlumatların avtomatik sinxronlaşdırılması təmin olunur.', SYSUTCDATETIME()),
(4,N'Aptek İdarəetmə sistemi',N'Dərman və reçetə',N'/assets/medicine.png',N'Aptek',N'/medicine',N'/assets/market1.png',N'Aptek İdarəetmə Sistemi Dərmanların Satışından Tutmuş Reçetə İdarəetməsinə Qədər Bütün Prosesləri Avtomatlaşdıraraq Təhlükəsiz və Səmərəli İdarəetmə Təmin Edir. Bu Proqram Vasitəsilə Siz Dərman Təhlükəsizliyini Təmin Edərək Müştərilərinə Keyfiyyətli Xidmət Göstərə Biləcəksiniz.',NULL,
 N'Aptek İdarəetmə Sistemi Dərmanların Satışından Tutmuş Reçetə İdarəetməsinə Qədər Bütün Prosesləri Avtomatlaşdıraraq Təhlükəsiz və Səmərəli İdarəetmə Təmin Edir. Bu Proqram Vasitəsilə Siz Dərman Təhlükəsizliyini Təmin Edərək Müştərilərinə Keyfiyyətli Xidmət Göstərə Biləcəksiniz.',
 N'Reçetəli və reçetəsiz dərman satışının idarə olunması, reçetələrin elektron qeydiyyatı və dərman təhlükəsizliyinin təmin edilməsi funksiyaları mövcuddur. Dərmanların son istifadə tarixinin izlənilməsi, dozaj və təlimatların avtomatik göstərilməsi, həmçinin dərman qarşılıqlı təsirlərinin yoxlanılması aparılır.',
 N'Dərman anbarının idarə olunması, təchizatçılardan sifarişlərin verilməsi və dərmanların keyfiyyət yoxlaması funksiyaları mövcuddur. Soyuducu dərmanların temperatur izlənməsi, dərman qruplarına görə təsnifat və avtomatik sifariş sistemi ilə anbarın idarə olunması təmin olunur.',
 N'Müştəri məlumatlarının saxlanılması, dərman alerqiyalarının qeydiyyatı və müştəri səhiyyə tarixçəsinin izlənilməsi funksiyaları mövcuddur. Dərman xatırlatmaları, dozaj təlimatları və müştəri məsləhəti xidmətləri təmin olunur. Səhiyyə təşkilatları ilə inteqrasiya, reçetələrin elektron göndərilməsi və dərman hesabatlarının hazırlanması funksiyaları mövcuddur. Dərman təhlükəsizliyi və keyfiyyət standartlarına uyğunluq izlənir.', SYSUTCDATETIME()),
(5,N'Ticarət və Anbar',N'Böyük həcmli ticarət',N'/assets/factory.png',N'Fabrika',N'/factory',N'/assets/market1.png',N'Ticarət və Anbar Modulunuz Böyük Həcmdə Mal Dövriyyəsinin İdarə Olunması, Çoxlu Anbar Sistemlərinin Koordinasiyası və Beynəlxalq Ticarət Əməliyyatlarının Həyata Keçirilməsi Üçün Nəzərdə Tutulub. Bu Proqram Vasitəsilə Siz Kompleks Ticarət Əməliyyatlarınızı Səmərəli Şəkildə İdarə Edə Biləcəksiniz.',NULL,
 N'Ticarət və Anbar Modulunuz Böyük Həcmdə Mal Dövriyyəsinin İdarə Olunması, Çoxlu Anbar Sistemlərinin Koordinasiyası və Beynəlxalq Ticarət Əməliyyatlarının Həyata Keçirilməsi Üçün Nəzərdə Tutulub. Bu Proqram Vasitəsilə Siz Kompleks Ticarət Əməliyyatlarınızı Səmərəli Şəkildə İdarə Edə Biləcəksiniz.',
 N'Böyük həcmdə malların idarə olunması, konteyner və yük daşıma sistemlərinin koordinasiyası və logistika proseslərinin idarə edilməsi funksiyaları mövcuddur. Çoxlu anbar sistemlərinin inteqrasiyası, mal axınlarının izlənilməsi və avtomatik hesabatların hazırlanması təmin olunur.',
 N'İdxal-ixrac əməliyyatlarının idarə olunması, gömrük sənədlərinin hazırlanması və beynəlxalq standartlara uyğunluq funksiyaları mövcuddur. Valyuta hesablamaları, beynəlxalq ödəniş sistemləri və ticarət müqavilələrinin idarə olunması aparılır.',
 N'Çoxlu anbar sistemlərinin birləşdirilmiş hesabatları, mal dövriyyəsinin analizi və gəlir-zərər hesabatlarının hazırlanması funksiyaları mövcuddur. Real vaxtda məlumat analizi, trend izləmə və strategiya planlaşdırması üçün alətlər təmin olunur. Avtomatik sifariş sistemi, təchizat zənciri optimizasiyası və mal itkisinin minimuma endirilməsi funksiyaları mövcuddur. Beynəlxalq standartlara uyğun keyfiyyət idarəetməsi və sertifikatlaşdırma prosesləri izlənir.', SYSUTCDATETIME()),
(6,N'Kredit və Lombard',N'Maliyyə xidmətləri',N'/assets/credit.png',N'Kredit',N'/credit',N'/assets/market1.png',N'Kredit və Lombard Modulunuz Müxtəlif Növ Kredit Xidmətlərinin Təqdim Edilməsi, Təhlükəsizlik Əşyalarının İdarə Olunması və Risk İdarəetməsi Funksiyalarını Birləşdirir. Bu Proqram Vasitəsilə Siz Maliyyə Xidmətlərinizi Təhlükəsiz və Səmərəli Şəkildə İdarə Edə Biləcəksiniz.',NULL,
 N'Kredit və Lombard Modulunuz Müxtəlif Növ Kredit Xidmətlərinin Təqdim Edilməsi, Təhlükəsizlik Əşyalarının İdarə Olunması və Risk İdarəetməsi Funksiyalarını Birləşdirir. Bu Proqram Vasitəsilə Siz Maliyyə Xidmətlərinizi Təhlükəsiz və Səmərəli Şəkildə İdarə Edə Biləcəksiniz.',
 N'Müxtəlif növ kreditlərin verilməsi, kredit müqavilələrinin hazırlanması və ödəniş cədvəllərinin idarə olunması funksiyaları mövcuddur. Kredit müraciətlərinin qiymətləndirilməsi, risk analizi və avtomatik hesablamalar aparılır. Müştəri kredit tarixçəsinin izlənilməsi və kredit limitlərinin təyin edilməsi təmin olunur.',
 N'Təhlükəsizlik əşyalarının qəbulu, qiymətləndirilməsi və saxlanılması funksiyaları mövcuddur. Əşyaların keyfiyyət yoxlaması, qiymət hesablaması və müqavilə şərtlərinin təyin edilməsi aparılır. Təhlükəsizlik sistemləri ilə inteqrasiya və əşyaların təhlükəsiz saxlanılması təmin olunur.',
 N'Kredit risklərinin qiymətləndirilməsi, müştəri etibarlılığının analizi və avtomatik xəbərdarlıq sistemlərinin idarə olunması funksiyaları mövcuddur. Maliyyə hesabatlarının hazırlanması, kredit portfelinin analizi və qanunvericiliyə uyğunluq izlənir. Avtomatik ödəniş izləmə sistemi, gecikmiş ödənişlər üçün xəbərdarlıqlar və kredit yeniləmə prosesləri idarə olunur. Müştəri məlumatlarının təhlükəsizliyi və məlumatların şifrələnməsi təmin olunur.', SYSUTCDATETIME());
SET IDENTITY_INSERT [Products] OFF;

-- Seed ProductImages thumbnails (relative URLs)
INSERT INTO [ProductImages] (ProductId, ImageUrl, Alt, OrderIndex) VALUES
(1,N'/assets/market2.png',N'Market',1),
(1,N'/assets/market3.png',N'Market',2),
(1,N'/assets/market4.png',N'Market',3),
(2,N'/assets/textile2.png',N'Tekstil',1),
(3,N'/assets/mobile2.png',N'Mobil',1);

COMMIT;

-- Verify
SELECT Id, Name, DetailDescription FROM Products ORDER BY Id;
SELECT ProductId, ImageUrl FROM ProductImages ORDER BY ProductId, OrderIndex;


