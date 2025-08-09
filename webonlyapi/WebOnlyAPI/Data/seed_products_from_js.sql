SET XACT_ABORT ON;
BEGIN TRAN;

-- Clear existing
IF OBJECT_ID(N'dbo.product_section_images','U') IS NOT NULL DELETE FROM dbo.product_section_images;
IF OBJECT_ID(N'dbo.product_sections','U') IS NOT NULL DELETE FROM dbo.product_sections;
IF OBJECT_ID(N'dbo.products','U') IS NOT NULL DELETE FROM dbo.products;

-- Products
INSERT INTO dbo.products (id, name, subtext, icon, alt, path, main_image, description) VALUES
(1, N'Market', N'Satış və anbar', N'/assets/market-icon.png', N'Market', N'/market', N'/assets/market1.png', N'Market Modulunuz Mallarınız Anbarınıza Daxil Olduğu Andan Etibarən Satılana Qədər Bütün Hərəkətlərini Təqib Edə, Mal Əsasında Qazanc Və Ya Zərərinizin Hesabatını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Barkodlu Mal Sərgiləyən Və Tətbiqini Həyata Keçirərək Müştərinin Tələblərinə Daha Sürətli Cavab Verəcək Və Anbarınızı Nəzarətdə Saxlaya Biləcəksiniz.'),
(2, N'Tekstil Modulu', N'İstehsal və toxuculuq', N'/assets/textile.png', N'Tekstil', N'/textile', N'/assets/market1.png', N'Tekstil Modulunuz Pambıqdan Başlayaraq Hazır Məhsula Qədər Bütün İstehsal Proseslərini İdarə Edə, Material Əsasında Xərc Və Qazanc Hesabatlarını Hazırlaya Bilər. Bu Proqram Vasitəsilə Siz Toxuculuq Və Tikiş Emalatxanalarınızı Rəqəmsallaşdıraraq İstehsal Səviyyənizi Artıra Biləcəksiniz.'),
(3, N'Mobil satış', N'Mobil satış nöqtələri', N'/assets/mobile.png', N'Mobil', N'/mobile', N'/assets/market1.png', N'Mobil Satış Modulunuz Satıcılarınızın Hər Yerdə Satış Əməliyyatlarını Həyata Keçirməsinə İmkan Verə, Real Vaxtda Mərkəzi Sistemlə Sinkronlaşdıra Bilər. Bu Proqram Vasitəsilə Siz Mobil Satış Nöqtələrini Genişləndirərək Satış Həcminizi Artıra Biləcəksiniz.'),
(4, N'Aptek İdarəetmə sistemi', N'Dərman və reçetə', N'/assets/medicine.png', N'Aptek', N'/medicine', N'/assets/market1.png', N'Aptek İdarəetmə Sistemi Dərmanların Satışından Tutmuş Reçetə İdarəetməsinə Qədər Bütün Prosesləri Avtomatlaşdıraraq Təhlükəsiz və Səmərəli İdarəetmə Təmin Edir. Bu Proqram Vasitəsilə Siz Dərman Təhlükəsizliyini Təmin Edərək Müştərilərinə Keyfiyyətli Xidmət Göstərə Biləcəksiniz.'),
(5, N'Ticarət və Anbar', N'Böyük həcmli ticarət', N'/assets/factory.png', N'Fabrika', N'/factory', N'/assets/market1.png', N'Ticarət və Anbar Modulunuz Böyük Həcmdə Mal Dövriyyəsinin İdarə Olunması, Çoxlu Anbar Sistemlərinin Koordinasiyası və Beynəlxalq Ticarət Əməliyyatlarının Həyata Keçirilməsi Üçün Nəzərdə Tutulub. Bu Proqram Vasitəsilə Siz Kompleks Ticarət Əməliyyatlarınızı Səmərəli Şəkildə İdarə Edə Biləcəksiniz.'),
(6, N'Kredit və Lombard', N'Maliyyə xidmətləri', N'/assets/credit.png', N'Kredit', N'/credit', N'/assets/market1.png', N'Kredit və Lombard Modulunuz Müxtəlif Növ Kredit Xidmətlərinin Təqdim Edilməsi, Təhlükəsizlik Əşyalarının İdarə Olunması və Risk İdarəetməsi Funksiyalarını Birləşdirir. Bu Proqram Vasitəsilə Siz Maliyyə Xidmətlərinizi Təhlükəsiz və Səmərəli Şəkildə İdarə Edə Biləcəksiniz.');

-- Section images
INSERT INTO dbo.product_section_images (product_id, image_path) VALUES
(1, N'/assets/market2.png'), (1, N'/assets/market3.png'), (1, N'/assets/market4.png'),
(2, N'/assets/market2.png'), (2, N'/assets/market3.png'),
(3, N'/assets/market2.png'), (3, N'/assets/market3.png'), (3, N'/assets/market4.png'),
(4, N'/assets/market2.png'), (4, N'/assets/market3.png'), (4, N'/assets/market4.png'),
(5, N'/assets/market2.png'), (5, N'/assets/market3.png'), (5, N'/assets/market4.png'),
(6, N'/assets/market2.png'), (6, N'/assets/market3.png'), (6, N'/assets/market4.png');

-- Sections for product 1
INSERT INTO dbo.product_sections (product_id, title, description, more_text) VALUES
(1, N'Satış və Kassa İdarəetməsi', N'Satış nöqtəsinin idarə olunması, satış tempinə nəzarət və müxtəlif mal qruplarına görə çeşidləmə imkanı mövcuddur. Endirimlər mal, şöbə, tarix və saata əsasən təyin edilə bilər. Barkodlu satış, çəki və ədədə görə əməliyyatlar, barkodlu tərəzi ilə inteqrasiya mümkündür. Satış faizi ilə avtomatik qiymət hesablana bilər. Alış-veriş statistikası izlənir, sensorlu ekran dəstəyi və müştəriyə dərhal faktura verilməsi təmin olunur.', N'Kassalara limitsiz kassir təyin etmək, günlük hesabatlar hazırlamaq, nağd və bank hesabları arası köçürmələri izləmək, qaytarma və ləğv əməliyyatlarını hesabatlarda göstərmək mümkündür.'),
(1, N'Müştəri və CRM İdarəetməsi', N'Müştəri məlumatları (təhsil, peşə və s.) sistemə daxil edilə bilər. Alış-veriş tarixçəsinə əsasən müştəriləri qruplaşdırmaq və analiz etmək mümkündür. Şikayət və təkliflər toplanır, fərdi qiymət və endirim kartları təyin olunur.', NULL),
(1, N'Təchizat və Anbar İdarəetməsi', N'Anbarlarda mal qrupları üzrə statistika, giriş-çıxış sənədləri və transferlər idarə olunur. Mağaza və anbarlara görə qalıqlar izlənir, avtomatik sənədləşmə aparılır. Barkodlu mobil cihaz dəstəyi, satış və maya dəyərinin analiz olunması, həmçinin avtomatik sayma funksiyası ilə mal itkisinə nəzarət mümkündür.', N'Satınalma sifarişləri mərhələli şəkildə qəbul edilir, valyuta seçimi və e-poçtla təchizatçılara göndərmək mümkündür. Qaytarma, dəyişdirmə və hesablaşmalar təqib olunur.');

-- Sections for product 2
INSERT INTO dbo.product_sections (product_id, title, description, more_text) VALUES
(2, N'İstehsal və Texnologiya İdarəetməsi', N'İstehsal proseslərinin planlaşdırılması, texnologiya axınlarının idarə olunması və keyfiyyət nəzarəti funksiyaları mövcuddur. Material tələbatının hesablanması, istehsal cədvəllərinin hazırlanması və avtomatik sifariş sistemi ilə təchizat idarə olunur. Toxuculuq və tikiş avadanlıqlarının texniki xidməti izlənir, istehsal standartları təyin edilir.', NULL),
(2, N'Material və Anbar İdarəetməsi', N'Xammal və yarımfabrikatların anbar idarəetməsi, material axınlarının izlənilməsi və keyfiyyət yoxlaması aparılır. Rəng və ölçü çeşidlərinin idarə olunması, material itkisinin minimuma endirilməsi və avtomatik hesabatlar hazırlanır.', NULL),
(2, N'Satış və Müştəri İdarəetməsi', N'Hazır məhsulların satışı, müştəri sifarişlərinin idarə olunması və çatdırılma prosesləri izlənir. Müştəri tələblərinə uyğun məhsul dizaynı, ölçü və rəng seçimləri, həmçinin keyfiyyət zəmanəti xidmətləri təmin olunur.', N'E-ticarət platformaları ilə inteqrasiya, onlayn sifariş sistemi və avtomatik qiymət hesablama funksiyaları mövcuddur. Müştəri məmnuniyyəti və geri qaytarma prosesləri idarə olunur.');

-- Sections for product 3
INSERT INTO dbo.product_sections (product_id, title, description, more_text) VALUES
(3, N'Mobil Satış Nöqtələri', N'Mobil cihazlar vasitəsilə satış əməliyyatlarının həyata keçirilməsi, barkod skan etmə və QR kod oxuma funksiyaları mövcuddur. Nağd və kart ödənişləri, endirim və bonus sistemləri, həmçinin müştəri məlumatlarının dərhal qeydiyyatı təmin olunur.', NULL),
(3, N'Real Vaxt Sinkronizasiyası', N'Mobil satış nöqtələri ilə mərkəzi sistem arasında real vaxtda məlumat mübadiləsi, anbar qalıqlarının avtomatik yenilənməsi və satış hesabatlarının dərhal hazırlanması funksiyaları mövcuddur.', NULL),
(3, N'Mobil Anbar İdarəetməsi', N'Mobil cihazlarla anbar əməliyyatlarının idarə olunması, mal qəbulu və çıxarılması, inventar sayımı və avtomatik hesabatların hazırlanması funksiyaları mövcuddur.', N'GPS izləmə sistemi ilə satıcıların hərəkətlərinin izlənilməsi, satış nöqtələrinin xəritədə göstərilməsi və performans analizi aparılır. Offline rejimdə işləmə imkanı və məlumatların avtomatik sinxronlaşdırılması təmin olunur.');

-- Sections for product 4
INSERT INTO dbo.product_sections (product_id, title, description, more_text) VALUES
(4, N'Dərman Satışı və Reçetə İdarəetməsi', N'Reçetəli və reçetəsiz dərman satışının idarə olunması, reçetələrin elektron qeydiyyatı və dərman təhlükəsizliyinin təmin edilməsi funksiyaları mövcuddur. Dərmanların son istifadə tarixinin izlənilməsi, dozaj və təlimatların avtomatik göstərilməsi, həmçinin dərman qarşılıqlı təsirlərinin yoxlanılması aparılır.', NULL),
(4, N'Dərman Anbarı və Təchizat', N'Dərman anbarının idarə olunması, təchizatçılardan sifarişlərin verilməsi və dərmanların keyfiyyət yoxlaması funksiyaları mövcuddur. Soyuducu dərmanların temperatur izləməsi, dərman qruplarına görə təsnifat və avtomatik sifariş sistemi ilə anbarın idarə olunması təmin olunur.', NULL),
(4, N'Müştəri və Səhiyyə Xidmətləri', N'Müştəri məlumatlarının saxlanılması, dərman alerqiyalarının qeydiyyatı və müştəri səhiyyə tarixçəsinin izlənilməsi funksiyaları mövcuddur. Dərman xatırlatmaları, dozaj təlimatları və müştəri məsləhəti xidmətləri təmin olunur.', N'Səhiyyə təşkilatları ilə inteqrasiya, reçetələrin elektron göndərilməsi və dərman hesabatlarının hazırlanması funksiyaları mövcuddur. Dərman təhlükəsizliyi və keyfiyyət standartlarına uyğunluq izlənir.');

-- Sections for product 5
INSERT INTO dbo.product_sections (product_id, title, description, more_text) VALUES
(5, N'Böyük Həcmdə Mal Dövriyyəsi', N'Böyük həcmdə malların idarə olunması, konteyner və yük daşıma sistemlərinin koordinasiyası və logistika proseslərinin idarə edilməsi funksiyaları mövcuddur. Çoxlu anbar sistemlərinin inteqrasiyası, mal axınlarının izlənilməsi və avtomatik hesabatların hazırlanması təmin olunur.', NULL),
(5, N'Beynəlxalq Ticarət Əməliyyatları', N'İdxal-ixrac əməliyyatlarının idarə olunması, gömrük sənədlərinin hazırlanması və beynəlxalq standartlara uyğunluq funksiyaları mövcuddur. Valyuta hesablamaları, beynəlxalq ödəniş sistemləri və ticarət müqavilələrinin idarə olunması aparılır.', NULL),
(5, N'Kompleks Hesabat və Analiz', N'Çoxlu anbar sistemlərinin birləşdirilmiş hesabatları, mal dövriyyəsinin analizi və gəlir-zərər hesabatlarının hazırlanması funksiyaları mövcuddur. Real vaxtda məlumat analizi, trend izləmə və strategiya planlaşdırması üçün alətlər təmin olunur.', N'Avtomatik sifariş sistemi, təchizat zənciri optimizasiyası və mal itkisinin minimuma endirilməsi funksiyaları mövcuddur. Beynəlxalq standartlara uyğun keyfiyyət idarəetməsi və sertifikatlaşdırma prosesləri izlənir.');

-- Sections for product 6
INSERT INTO dbo.product_sections (product_id, title, description, more_text) VALUES
(6, N'Kredit Əməliyyatları İdarəetməsi', N'Müxtəlif növ kreditlərin verilməsi, kredit müqavilələrinin hazırlanması və ödəniş cədvəllərinin idarə olunması funksiyaları mövcuddur. Kredit müraciətlərinin qiymətləndirilməsi, risk analizi və avtomatik hesablamalar aparılır. Müştəri kredit tarixçəsinin izlənilməsi və kredit limitlərinin təyin edilməsi təmin olunur.', NULL),
(6, N'Lombard və Təhlükəsizlik Əşyaları', N'Təhlükəsizlik əşyalarının qəbulu, qiymətləndirilməsi və saxlanılması funksiyaları mövcuddur. Əşyaların keyfiyyət yoxlaması, qiymət hesablaması və müqavilə şərtlərinin təyin edilməsi aparılır. Təhlükəsizlik sistemləri ilə inteqrasiya və əşyaların təhlükəsiz saxlanılması təmin olunur.', NULL),
(6, N'Risk İdarəetməsi və Hesabatlar', N'Kredit risklərinin qiymətləndirilməsi, müştəri etibarlılığının analizi və avtomatik xəbərdarlıq sistemlərinin idarə olunması funksiyaları mövcuddur. Maliyyə hesabatlarının hazırlanması, kredit portfelinin analizi və qanunvericiliyə uyğunluq izlənir.', N'Avtomatik ödəniş izləmə sistemi, gecikmiş ödənişlər üçün xəbərdarlıqlar və kredit yeniləmə prosesləri idarə olunur. Müştəri məlumatlarının təhlükəsizliyi və məlumatların şifrələnməsi təmin olunur.');

COMMIT;


