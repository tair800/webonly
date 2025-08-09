Paste this into SSMS (New Query) and run:

```sql
-- Services + Articles Unicode insert (run in SSMS)

BEGIN TRAN;

-- Ensure empty and identity starts at 1
DELETE FROM ServiceArticles;
DELETE FROM Services;
DBCC CHECKIDENT ('Services', RESEED, 0);

SET IDENTITY_INSERT Services ON;

INSERT INTO Services (Id, Name, Subtitle, Icon, DetailImage, Description, Subtext, ImageUrl, CreatedAt)
VALUES
(1, N'Bazanın arxivlənməsi', N'Arxivləmə', N'/assets/service1.png', N'/assets/servicesDetail1.png',
 N'Arxivləmə prosesi sistemdəki məlumatların təhlükəsizliyini və davamlılığını təmin etmək üçün vacib funksiyadır. Bu modul vasitəsilə məlumatlar müəyyən dövrlərdə avtomatik və ya əl ilə arxivlənə bilər. Arxivlənmiş fayllar ehtiyac olduqda tez bir zamanda bərpa edilə bilir. Bu, həm yaddaşdan səmərəli istifadəni, həm də fövqəladə hallarda məlumat itkisinə qarşı qorumanı təmin edir. Eyni zamanda sistemin yüklənməsinin qarşısını alaraq ümumi performansı artırır.',
 NULL, NULL, GETDATE()),
(2, N'Logların saxlanılması', N'Loglama', N'/assets/service2.png', N'/assets/servicesDetail2.png',
 N'Loglama sistemi bütün sistem əməliyyatlarının detallı qeydiyyatını saxlayır. Bu modul vasitəsilə istifadəçi hərəkətləri, sistem hadisələri və xətalar avtomatik olaraq qeydə alınır. Loglar təhlükəsizlik auditləri, problemlərin həlli və sistemin performansının izlənilməsi üçün vacibdir. Məlumatlar müəyyən müddət saxlanılır və lazım olduqda axtarış və analiz edilə bilər.',
 NULL, NULL, GETDATE()),
(3, N'Hesabatların e-poçt göndərilməsi', N'E-poçt', N'/assets/service3.png', N'/assets/servicesDetail3.png',
 N'E-poçt modulu hesabatların avtomatik olaraq müəyyən istifadəçilərə göndərilməsini təmin edir. Sistem müəyyən dövrlərdə və ya hadisələr baş verdikdə hesabatları hazırlayır və təyin edilmiş e-poçt ünvanlarına göndərir. Bu, idarəetmə qərarlarının qəbul edilməsi üçün vaxtında məlumat əldə etməyi təmin edir və manual hesabat göndərmə prosesini avtomatlaşdırır.',
 NULL, NULL, GETDATE()),
(4, N'Mobil hesabatlar', N'Mobil hesabatlar', N'/assets/service4.png', N'/assets/servicesDetail4.png',
 N'Mobil hesabatlar modulu istifadəçilərə mobil cihazlar vasitəsilə sistem məlumatlarına daxil olmaq imkanı verir. Bu modul responsive dizayn prinsiplərinə əsaslanır və müxtəlif ekran ölçülərinə uyğunlaşır. İstifadəçilər hər yerdən hesabatlara baxa, məlumatları analiz edə və vacib göstəriciləri izləyə bilərlər.',
 NULL, NULL, GETDATE()),
(5, N'Bazanın nüsxəsinin alınması', N'Nüsxələmə', N'/assets/service5.png', N'/assets/servicesDetail5.png',
 N'Nüsxələmə modulu verilənlər bazasının tam və ya qismən nüsxələrini almaq üçün istifadə olunur. Bu proses məlumatların təhlükəsizliyini təmin edir və sistem bərpası üçün vacibdir. Nüsxələr müəyyən dövrlərdə avtomatik olaraq və ya əl ilə alına bilər. Nüsxələnmiş fayllar təhlükəsiz şəkildə saxlanılır və lazım olduqda bərpa edilə bilər.',
 NULL, NULL, GETDATE()),
(6, N'Bonus modulunun tətbiqi', N'Bonus modulu', N'/assets/service6.png', N'/assets/servicesDetail6.png',
 N'Bonus modulu işçilərin performansını artırmaq və motivasiyalarını yüksəltmək üçün nəzərdə tutulmuşdur. Bu modul vasitəsilə müxtəlif bonus növləri təyin edilə bilər və avtomatik hesablanır. Sistem işçilərin nailiyyətlərini izləyir və müəyyən kriteriyalara əsaslanaraq bonusları hesablayır. Bu, ədalətli və şəffaf bonus sistemi yaradır.',
 NULL, NULL, GETDATE()),
(7, N'Hesabatların hazırlanması', N'Hesabatlar', N'/assets/service7.png', N'/assets/servicesDetail7.png',
 N'Hesabatlar modulu müxtəlif növ hesabatların hazırlanması və təqdim edilməsi üçün istifadə olunur. Sistem məlumatlarından avtomatik olaraq hesabatlar yaradır və müxtəlif formatlarda (PDF, Excel, HTML) ixrac edə bilər. Hesabatlar müəyyən dövrlərdə və ya real vaxtda hazırlana bilər və idarəetmə qərarları üçün vacib məlumatlar təqdim edir.',
 NULL, NULL, GETDATE()),
(8, N'Əməliyyat sisteminin yazılması', N'Əməliyyat sistemi', N'/assets/service8.png', N'/assets/servicesDetail8.png',
 N'Əməliyyat sistemi modulu müəssisənin əsas biznes proseslərini idarə etmək üçün nəzərdə tutulmuşdur. Bu modul vasitəsilə müxtəlif əməliyyatlar avtomatlaşdırılır və izlənilir. Sistem iş axınlarını idarə edir, tapşırıqları paylayır və proseslərin effektivliyini artırır. Bu, əməliyyatların daha sürətli və dəqiq yerinə yetirilməsini təmin edir.',
 NULL, NULL, GETDATE()),
(9, N'Sistemin audit olunması', N'Audit', N'/assets/service9.png', N'/assets/servicesDetail9.png',
 N'Audit modulu sistemin təhlükəsizliyini və performansını qiymətləndirmək üçün istifadə olunur. Bu modul vasitəsilə sistem əməliyyatları, istifadəçi hərəkətləri və təhlükəsizlik hadisələri izlənilir və analiz edilir. Audit hesabatları sistemin uyğunluğunu yoxlayır və təkmilləşdirmə təklifləri təqdim edir. Bu, sistemin etibarlılığını və təhlükəsizliyini təmin edir.',
 NULL, NULL, GETDATE());

SET IDENTITY_INSERT Services OFF;

-- Articles for Service 2
INSERT INTO ServiceArticles (ServiceId, Number, Title, Description, OrderIndex, CreatedAt)
VALUES
(2, N'01', N'Identify & Monitor Your Data',
 N'Verilənlərin buludda, mobil qurğuda və lokal mühitlərdə aşkarlanması və istifadəsinin izlənməsi imkanı təmin olunur.', 1, GETDATE()),
(2, N'02', N'Real-time Analytics',
 N'Sistem məlumatlarının real vaxtda analizi və hesabatların avtomatik hazırlanması funksiyası.', 2, GETDATE()),
(2, N'03', N'Security Monitoring',
 N'Təhlükəsizlik hadisələrinin izlənilməsi və avtomatik xəbərdarlıq sistemlərinin idarə edilməsi.', 3, GETDATE());

COMMIT;

-- Quick check
SELECT TOP 3 Id, Name, Subtitle FROM Services ORDER BY Id;
SELECT COUNT(*) AS HasSchwa FROM Services WHERE Name LIKE N'%' + NCHAR(601) + N'%';
```