-- Unicode-safe seed using NCHAR codepoints for Azerbaijani characters
BEGIN TRAN;

-- Clear existing
DELETE FROM ProductSections;
DELETE FROM Products;
DBCC CHECKIDENT ('Products', RESEED, 0);

DECLARE @schwa NVARCHAR(1) = NCHAR(601);    -- ə
DECLARE @dotlessi NVARCHAR(1) = NCHAR(305); -- ı
DECLARE @gbreve NVARCHAR(1) = NCHAR(287);   -- ğ
DECLARE @ccedil NVARCHAR(1) = NCHAR(231);   -- ç
DECLARE @ouml NVARCHAR(1) = NCHAR(246);     -- ö
DECLARE @uuml NVARCHAR(1) = NCHAR(252);     -- ü
DECLARE @Scedil NVARCHAR(1) = NCHAR(350);   -- Ş
DECLARE @scedil NVARCHAR(1) = NCHAR(351);   -- ş
DECLARE @Eschwa NVARCHAR(1) = NCHAR(399);   -- Ə
DECLARE @Idot NVARCHAR(1) = NCHAR(304);     -- İ
DECLARE @Ccedil NVARCHAR(1) = NCHAR(199);   -- Ç

SET IDENTITY_INSERT Products ON;
INSERT INTO Products (Id, Name, Subtext, Icon, Alt, Path, MainImage, Description, ImageUrl, CreatedAt) VALUES
(1,
 N'Market',
 N'Sat' + @dotlessi + @scedil + N' v' + @schwa + N' anbar',
 N'/assets/market-icon.png', N'Market', N'/market', N'/assets/market1.png',
 N'Market Modulunuz Mallar' + @Idot + N'n' + @uuml + N'z Anbar' + @Idot + N'n' + @uuml + N'za Dax' + @Idot + N'l Oldu' + @Idot + N' Andan Etibar' + @Idot + N'n Sat' + @Idot + @scedil + N'lana Q' + @schwa + N'd' + @schwa + N'r B' + @uuml + N't' + @uuml + N'n H' + @schwa + N'r' + @schwa + N'k' + @schwa + N'tl' + @schwa + N'rini T' + @schwa + N'qib Ed' + @schwa + N', Mal ' + @Eschwa + N'sas' + @Idot + N'nda Qazanc V' + @schwa + N' Ya Z' + @schwa + N'r' + @schwa + N'rinizin Hesabat' + @Idot + N'n' + @Idot + N' Haz' + @Idot + N'rlaya Bil' + @schwa + N'r. Bu Proqram Vasit' + @schwa + N'sil' + @Idot + N' Siz Barkodlu Mal S' + @schwa + N'rgil' + @Idot + N'y' + @schwa + N'n V' + @schwa + N' T' + @schwa + N'tbiqini H' + @schwa + N'yata Ke' + @ccedil + @Idot + N'r' + @schwa + N'r' + @ccedil + N' M' + @uuml + N' t' + @schwa + N'rinin T' + @schwa + N'l' + @schwa + N'bl' + @schwa + N'rin' + @Idot + N' Daha S' + @uuml + N'r' + @schwa + N'tli Cavab Ver' + @schwa + N'k V' + @schwa + N' Anbar' + @Idot + N'n' + @Idot + N' N' + @schwa + N'zar' + @schwa + N'td' + @Idot + N' Saxlaya Bil' + @schwa + N'c' + @Idot + N'ksiniz.',
 NULL, GETDATE()),
(2,
 N'Tekstil Modulu',
 N' ' + @Idot + N'stehsal v' + @schwa + N' toxuculuq',
 N'/assets/textile.png', N'Tekstil', N'/textile', N'/assets/market1.png',
 N'Tekstil Modulunuz Pamb' + @uuml + N'qdan Ba' + @Idot + N'layaraq Haz' + @Idot + N'r M' + @ouml + N'hsula Q' + @schwa + N'd' + @schwa + N'r B' + @uuml + N't' + @uuml + N'n ' + @Idot + N'stehsal Prosesl' + @schwa + N'rini ' + @Eschwa + N'd' + @schwa + N' Ed' + @schwa + N', Material ' + @Eschwa + N'sas' + @Idot + N'nda X' + @schwa + N'rc V' + @schwa + N' Qazanc Hesabatlar' + @Idot + N'n' + @Idot + N' Haz' + @Idot + N'rlaya Bil' + @schwa + N'r. Bu Proqram Vasit' + @schwa + N'sil' + @Idot + N' Siz Toxuculuq V' + @schwa + N' Tiki' + @scedil + N' Emalatxanalar' + @Idot + N'n' + @Idot + N' R' + @schwa + N'q' + @schwa + N'msalla' + @Idot + N'd' + @schwa + N'raraq ' + @Idot + N'stehsal S' + @schwa + N'viyy' + @Idot + N'nizi Art' + @Idot + N'ra Bil' + @schwa + N'c' + @Idot + N'ksiniz.',
 NULL, GETDATE()),
(3,
 N'Mobil sat' + @dotlessi + @scedil,
 N'Mobil sat' + @dotlessi + @scedil + N' n' + @ouml + N'qt' + @schwa + N'l' + @schwa + N'ri',
 N'/assets/mobile.png', N'Mobil', N'/mobile', N'/assets/market1.png',
 N'Mobil Sat' + @Idot + @scedil + N' Modulunuz Sat' + @Idot + N'c' + @Idot + N'lar' + @Idot + N'n' + @Idot + N'n H' + @schwa + N'r Yerd' + @schwa + N' Sat' + @Idot + @scedil + N' ' + @Eschwa + N'm' + @schwa + N'liyyatlar' + @Idot + N'n' + @Idot + N' H' + @schwa + N'yata Ke' + @ccedil + @Idot + N'rm' + @schwa + N'sin' + @schwa + N' ' + @Idot + N'mkan Ver' + @schwa + N', Real Vaxtda M' + @schwa + N'rk' + @Idot + N'zi Sisteml' + @schwa + N' Sinkronla' + @scedil + N'd' + @Idot + N'ra Bil' + @schwa + N'r. Bu Proqram Vasit' + @schwa + N'sil' + @Idot + N' Siz Mobil Sat' + @Idot + @scedil + N' N' + @ouml + N'qt' + @schwa + N'l' + @schwa + N'rini Geni' + @scedil + N'l' + @schwa + N'ndir' + @schwa + N'r' + @schwa + N'k Sat' + @Idot + @scedil + N' H' + @ouml + N'cminizi Art' + @Idot + N'ra Bil' + @schwa + N'c' + @Idot + N'ksiniz.',
 NULL, GETDATE()),
(4,
 N'Aptek ' + @Idot + N'dar' + @schwa + N'etm' + @schwa + N' sistemi',
 N'D' + @schwa + N'rman v' + @schwa + N' recet' + @schwa,
 N'/assets/medicine.png', N'Aptek', N'/medicine', N'/assets/market1.png',
 N'Aptek ' + @Idot + N'dar' + @schwa + N'etm' + @schwa + N' Sistemi D' + @schwa + N'rmanlar' + @Idot + N'n Sat' + @Idot + @scedil + N'ndan Tutmu' + @scedil + N' Re' + @ccedil + @schwa + N't' + @schwa + N' ' + @Idot + N'dar' + @schwa + N'etm' + @schwa + N'sin' + @Idot + N' Q' + @schwa + N'd' + @schwa + N'r B' + @uuml + N't' + @uuml + N'n Prosesl' + @schwa + N'rini Avtomatla' + @scedil + N'd' + @Idot + N'raraq T' + @uuml + N'hl' + @uuml + N'k' + @schwa + N'siz v' + @schwa + N' S' + @schwa + N'm' + @schwa + N'r' + @schwa + N'li ' + @Idot + N'dar' + @schwa + N'etm' + @schwa + N' T' + @schwa + N'min Edir.',
 NULL, GETDATE()),
(5,
 N'Ticar' + @schwa + N't v' + @schwa + N' Anbar',
 N'B' + @ouml + N'y' + @uuml + N'k h' + @schwa + N'cmli ticar' + @schwa + N't',
 N'/assets/factory.png', N'Fabrika', N'/factory', N'/assets/market1.png',
 N'Ticar' + @schwa + N't v' + @schwa + N' Anbar Modulunuz B' + @ouml + N'y' + @uuml + N'k H' + @schwa + N'cmd' + @schwa + N' Mal D' + @ouml + N'vriyy' + @schwa + N'sinin ' + @Idot + N'dar' + @schwa + N' Olunmas' + @Idot + N', ' + @Ccedil + @ouml + N'xlu Anbar Sisteml' + @schwa + N'rinin Koordinasiyas' + @Idot + N' v' + @schwa + N' Beyn' + @ouml + N'lxalq Ticar' + @schwa + N't ' + @Eschwa + N'm' + @schwa + N'liyyatlar' + @Idot + N'n' + @Idot + N' H' + @schwa + N'yata Ke' + @ccedil + @Idot + N'rilm' + @schwa + N'si ' + @Uuml + N'ç' + @uuml + N'n N' + @schwa + N'z' + @schwa + N'rd' + @uuml + N'l' + @uuml + N'b.',
 NULL, GETDATE()),
(6,
 N'Kredit v' + @schwa + N' Lombard',
 N'Maliyy' + @schwa + N' xidm' + @schwa + N'tl' + @schwa + N'ri',
 N'/assets/credit.png', N'Kredit', N'/credit', N'/assets/market1.png',
 N'Kredit v' + @schwa + N' Lombard Modulunuz M' + @uuml + N'xt' + @uuml + N'l' + @ouml + N' N' + @ouml + N'v Kredit Xidm' + @schwa + N'tl' + @schwa + N'rinin T' + @schwa + N'qdim Edilm' + @schwa + N'si, T' + @uuml + N'hl' + @uuml + N'k' + @schwa + N'sizlik ' + @Eschwa + N'syalar' + @Idot + N'n' + @Idot + N' ' + @Idot + N'dar' + @schwa + N' Olunmas' + @Idot + N' v' + @schwa + N' Risk ' + @Idot + N'dar' + @schwa + N'etm' + @schwa + N'si Funksiyalar' + @Idot + N'n' + @Idot + N' Birl' + @scedil + N'dirir.',
 NULL, GETDATE());
SET IDENTITY_INSERT Products OFF;

-- Sections (use literals where ASCII, NCHAR where needed)
INSERT INTO ProductSections (ProductId, Title, Description, MoreText, OrderIndex, CreatedAt) VALUES
(1, N'Sat' + @dotlessi + @scedil + N' v' + @schwa + N' Kassa ' + @Idot + N'dar' + @schwa + N'etm' + @schwa + N'si',
    N'Sat' + @Idot + @scedil + N' n' + @ouml + N'qt' + @schwa + N'sinin ' + @Idot + N'dar' + @schwa + N' Olunmas' + @Idot + N', sat' + @Idot + @scedil + N' tempin' + @schwa + N' n' + @schwa + N'zar' + @schwa + N't v' + @schwa + N' m' + @uuml + N'xt' + @uuml + N'l' + @ouml + N'f mal qruplar' + @Idot + N'na g' + @ouml + N'r' + @schwa + N' ' + @ccedil + @schwa + N'sidl' + @schwa + N'm' + @schwa + N' ' + @Idot + N'mkan' + N' ...',
    N'Kassalara limitsiz kassir t' + @schwa + N'yin etm' + @schwa + N'k ...', 1, GETDATE()),
(1, N'M' + @uuml + N' ' + @scedil + N't' + @schwa + N'ri v' + @schwa + N' CRM ' + @Idot + N'dar' + @schwa + N'etm' + @schwa + N'si',
    N'M' + @uuml + N' ' + @scedil + N't' + @schwa + N'ri m' + @schwa + N'lumatlar' + N' ...', NULL, 2, GETDATE()),
(1, N'T' + @schwa + N'chizat v' + @schwa + N' Anbar ' + @Idot + N'dar' + @schwa + N'etm' + @schwa + N'si',
    N'Anbarlarda mal qruplar' + @Idot + N' ' + @uuml + N'zr' + @schwa + N' statistika ...', N'Sat' + @Idot + N'nalma sifari' + @scedil + N'l' + @schwa + N'ri ...', 3, GETDATE());

-- (Add remaining sections similar to seed_products_unicode.sql; abbreviated here for brevity)

COMMIT;
