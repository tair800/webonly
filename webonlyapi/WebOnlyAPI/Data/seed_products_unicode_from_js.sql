SET XACT_ABORT ON;
BEGIN TRAN;

-- Ensure rows exist; otherwise insert minimal row first
IF NOT EXISTS (SELECT 1 FROM dbo.products WHERE id = 1) INSERT INTO dbo.products (id, name) VALUES (1, N'Market');
IF NOT EXISTS (SELECT 1 FROM dbo.products WHERE id = 2) INSERT INTO dbo.products (id, name) VALUES (2, N'Tekstil Modulu');
IF NOT EXISTS (SELECT 1 FROM dbo.products WHERE id = 3) INSERT INTO dbo.products (id, name) VALUES (3, N'Mobil satış');
IF NOT EXISTS (SELECT 1 FROM dbo.products WHERE id = 4) INSERT INTO dbo.products (id, name) VALUES (4, N'Aptek İdarəetmə sistemi');
IF NOT EXISTS (SELECT 1 FROM dbo.products WHERE id = 5) INSERT INTO dbo.products (id, name) VALUES (5, N'Ticarət və Anbar');
IF NOT EXISTS (SELECT 1 FROM dbo.products WHERE id = 6) INSERT INTO dbo.products (id, name) VALUES (6, N'Kredit və Lombard');

UPDATE dbo.products
SET
    name = N'Market',
    subtext = N'Satış və anbar',
    icon = N'/assets/market-icon.png',
    alt = N'Market',
    path = N'/market',
    main_image = N'/assets/market1.png',
    description = N'Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Barkodlu Mal Sərgiləyən Və Tətbiqini Həyata Keçirərək Müştərinin Tələblərinə Daha Sürətli Cavab Verəcək Və Anbarınızı Nəzarətdə Saxlaya Biləcəksiniz.'
WHERE id = 1;

UPDATE dbo.products
SET
    name = N'Tekstil Modulu',
    subtext = N'İstehsal və toxuculuq',
    icon = N'/assets/textile.png',
    alt = N'Tekstil',
    path = N'/textile',
    main_image = N'/assets/market1.png',
    description = N'Tekstil Modulunuz Pambıqdan Başlayaraq Hazır Məhsula Qədər Bütün İstehsal Proseslərini İdarə Edə, Material Əsasında Xərc Və Qazanc Hesabatlarını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Toxuculuq Və Tikiş Emalatxanalarınızı Rəqəmsallaşdıraraq İstehsal Səviyyənizi Artıra Biləcəksiniz.'
WHERE id = 2;

UPDATE dbo.products
SET
    name = N'Mobil satış',
    subtext = N'Mobil satış nöqtələri',
    icon = N'/assets/mobile.png',
    alt = N'Mobil',
    path = N'/mobile',
    main_image = N'/assets/market1.png',
    description = N'Mobil Satış Modulunuz Satıcılarınızın Hər Yerdə Satış Əməliyyatlarını Həyata Keçirməsinə İmkan Verə, Real Vaxtda Mərkəzi Sistemlə Sinkronlaşdıra Bilər. Bu Proqram Vasitəsilə Siz Mobil Satış Nöqtələrini Genişləndirərək Satış Həcminizi Artıra Biləcəksiniz.'
WHERE id = 3;

UPDATE dbo.products
SET
    name = N'Aptek İdarəetmə sistemi',
    subtext = N'Dərman və reçetə',
    icon = N'/assets/medicine.png',
    alt = N'Aptek',
    path = N'/medicine',
    main_image = N'/assets/market1.png',
    description = N'Aptek İdarəetmə Sistemi Dərmanların Satışından Tutmuş Reçetə İdarəetməsinə Qədər Bütün Prosesləri Avtomatlaşdıraraq Təhlükəsiz və Səmərəli İdarəetmə Təmin Edir. Bu Proqram Vasitəsilə Siz Dərman Təhlükəsizliyini Təmin Edərək Müştərilərinə Keyfiyyətli Xidmət Göstərə Biləcəksiniz.'
WHERE id = 4;

UPDATE dbo.products
SET
    name = N'Ticarət və Anbar',
    subtext = N'Böyük həcmli ticarət',
    icon = N'/assets/factory.png',
    alt = N'Fabrika',
    path = N'/factory',
    main_image = N'/assets/market1.png',
    description = N'Ticarət və Anbar Modulunuz Böyük Həcmdə Mal Dövriyyəsinin İdarə Olunması, Çoxlu Anbar Sistemlərinin Koordinasiyası və Beynəlxalq Ticarət Əməliyyatlarının Həyata Keçirilməsi Üçün Nəzərdə Tutulub. Bu Proqram Vasitəsilə Siz Kompleks Ticarət Əməliyyatlarınızı Səmərəli Şəkildə İdarə Edə Biləcəksiniz.'
WHERE id = 5;

UPDATE dbo.products
SET
    name = N'Kredit və Lombard',
    subtext = N'Maliyyə xidmətləri',
    icon = N'/assets/credit.png',
    alt = N'Kredit',
    path = N'/credit',
    main_image = N'/assets/market1.png',
    description = N'Kredit və Lombard Modulunuz Müxtəlif Növ Kredit Xidmətlərinin Təqdim Edilməsi, Təhlükəsizlik Əşyalarının İdarə Olunması və Risk İdarəetməsi Funksiyalarını Birləşdirir. Bu Proqram Vasitəsilə Siz Maliyyə Xidmətlərinizi Təhlükəsiz və Səmərəli Şəkildə İdarə Edə Biləcəksiniz.'
WHERE id = 6;

COMMIT;


