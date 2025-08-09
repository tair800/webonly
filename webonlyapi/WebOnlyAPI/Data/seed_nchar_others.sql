-- NCHAR-based seed for ProductSections, EquipmentFeatures, EquipmentSpecifications, Employees
SET XACT_ABORT ON;
BEGIN TRAN;

-- Clear existing
DELETE FROM ProductSections;
DELETE FROM EquipmentFeatures;
DELETE FROM EquipmentSpecifications;
DELETE FROM Employees;

DBCC CHECKIDENT ('ProductSections', RESEED, 0);
DBCC CHECKIDENT ('EquipmentFeatures', RESEED, 0);
DBCC CHECKIDENT ('EquipmentSpecifications', RESEED, 0);
DBCC CHECKIDENT ('Employees', RESEED, 0);

-- Azerbaijani codepoints
DECLARE @az_schwa NVARCHAR(1) = NCHAR(601);       -- ə
DECLARE @az_dotlessi NVARCHAR(1) = NCHAR(305);    -- ı
DECLARE @az_gbreve NVARCHAR(1) = NCHAR(287);      -- ğ
DECLARE @az_c_cedil NVARCHAR(1) = NCHAR(231);     -- ç
DECLARE @az_o_dia NVARCHAR(1) = NCHAR(246);       -- ö
DECLARE @az_u_dia NVARCHAR(1) = NCHAR(252);       -- ü
DECLARE @az_S_cedil NVARCHAR(1) = NCHAR(350);     -- Ş
DECLARE @az_s_cedil NVARCHAR(1) = NCHAR(351);     -- ş
DECLARE @az_E_schwa NVARCHAR(1) = NCHAR(399);     -- Ə
DECLARE @az_I_dot NVARCHAR(1) = NCHAR(304);       -- İ
DECLARE @az_C_cedil NVARCHAR(1) = NCHAR(199);     -- Ç

-- ProductSections (18 rows)
INSERT INTO ProductSections (ProductId, Title, Description, MoreText, OrderIndex, CreatedAt) VALUES
-- 1 Market
(1, N'Sat' + @az_dotlessi + @az_s_cedil + N' v' + @az_schwa + N' Kassa ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'Sat' + @az_I_dot + @az_s_cedil + N' n' + @az_o_dia + N'qt' + @az_schwa + N'sinin ' + @az_I_dot + N'dar' + @az_schwa + N' olunmas' + @az_I_dot + N' v' + @az_schwa + N' n' + @az_schwa + N'zar' + @az_schwa + N't.',
    N'Kassalara limitsiz kassir t' + @az_schwa + N'yin.', 1, GETDATE()),
(1, N'M' + @az_u_dia + N' ' + @az_s_cedil + N't' + @az_schwa + N'ri v' + @az_schwa + N' CRM ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'M' + @az_u_dia + N' ' + @az_s_cedil + N't' + @az_schwa + N'ri m' + @az_schwa + N'lumatlar' + @az_I_dot + N'n' + @az_I_dot + N' idar' + @az_schwa + N' olunmas' + @az_I_dot + N'.',
    NULL, 2, GETDATE()),
(1, N'T' + @az_schwa + N'chizat v' + @az_schwa + N' Anbar ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'Anbarlarda mal qruplar' + @az_I_dot + N' statistika.',
    N'Sat' + @az_I_dot + N'nalma sifari' + @az_s_cedil + N'l' + @az_schwa + N'ri.', 3, GETDATE()),
-- 2 Tekstil
(2, N' ' + @az_I_dot + N'stehsal v' + @az_schwa + N' Texnologiya ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'Planla' + @az_s_cedil + N'd' + @az_I_dot + N'rma v' + @az_schwa + N' keyfiyy' + @az_schwa + N't n' + @az_schwa + N'zar' + @az_schwa + N'ti.',
    NULL, 1, GETDATE()),
(2, N'Material v' + @az_schwa + N' Anbar ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'Xammal v' + @az_schwa + N' yar' + @az_I_dot + N'mfabrikatlar' + @az_I_dot + N'n n' + @az_schwa + N'zar' + @az_schwa + N'ti.',
    NULL, 2, GETDATE()),
(2, N'Sat' + @az_I_dot + @az_s_cedil + N' v' + @az_schwa + N' M' + @az_u_dia + N' ' + @az_s_cedil + N't' + @az_schwa + N'ri ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'Haz' + @az_I_dot + N'r m' + @az_o_dia + N'hsullar' + @az_I_dot + N'n sat' + @az_I_dot + @az_s_cedil + N' prosesi.',
    N'E-ticar' + @az_schwa + N't inteqrasiya.', 3, GETDATE()),
-- 3 Mobil
(3, N'Mobil Sat' + @az_I_dot + @az_s_cedil + N' N' + @az_o_dia + N'qt' + @az_schwa + N'l' + @az_schwa + N'ri',
    N'Mobil c' + @az_I_dot + N'hazlarla sat' + @az_I_dot + @az_s_cedil + N' ' + @az_E_schwa + N'm' + @az_schwa + N'liyyatlar' + @az_I_dot + N'.',
    NULL, 1, GETDATE()),
(3, N'Real Vaxt Sinkronizasiyas' + @az_I_dot,
    N'M' + @az_schwa + N'rk' + @az_I_dot + N'zi sisteml' + @az_schwa + N' aras' + @az_I_dot + N'nda m' + @az_schwa + N'lumat m' + @az_u_dia + N'badil' + @az_schwa + N'si.',
    NULL, 2, GETDATE()),
(3, N'Mobil Anbar ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'Q' + @az_schwa + N'bul, ' + @az_I_dot + N'nventar say' + @az_I_dot + N'm' + @az_I_dot + N'.',
    N'GPS izl' + @az_schwa + N'm' + @az_schwa + N', offline ' + @az_I_dot + N'mkan.', 3, GETDATE()),
-- 4 Aptek
(4, N'D' + @az_schwa + N'rman Sat' + @az_I_dot + @az_s_cedil + N' v' + @az_schwa + N' Re' + @az_c_cedil + @az_schwa + N't' + @az_schwa + N' ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'Re' + @az_c_cedil + @az_schwa + N't' + @az_schwa + N'li/re' + @az_c_cedil + @az_schwa + N't' + @az_schwa + N'siz sat' + @az_I_dot + @az_s_cedil + N'.',
    NULL, 1, GETDATE()),
(4, N'D' + @az_schwa + N'rman Anbar' + @az_I_dot + N' v' + @az_schwa + N' T' + @az_schwa + N'chizat',
    N'Soyuducu d' + @az_schwa + N'rmanlar' + @az_I_dot + N'n temperatur izl' + @az_schwa + N'm' + @az_schwa + N'si.',
    NULL, 2, GETDATE()),
(4, N'M' + @az_u_dia + N' ' + @az_s_cedil + N't' + @az_schwa + N'ri v' + @az_schwa + N' S' + @az_schwa + N'hiyy' + @az_schwa + N' Xidm' + @az_schwa + N'tl' + @az_schwa + N'ri',
    N'M' + @az_u_dia + N' ' + @az_s_cedil + N't' + @az_schwa + N'ri m' + @az_schwa + N'lumatlar' + @az_I_dot + N'n saxlanmas' + @az_I_dot + N'.',
    N'Intiqrasiya v' + @az_schwa + N' hesabatlar.', 3, GETDATE()),
-- 5 Ticarət
(5, N'B' + @az_o_dia + N'y' + @az_u_dia + N'k H' + @az_schwa + N'cmd' + @az_schwa + N' Mal D' + @az_o_dia + N'vriyy' + @az_schwa + N'si',
    N'Logistika prosesl' + @az_schwa + N'ri.', NULL, 1, GETDATE()),
(5, N'Beyn' + @az_o_dia + N'lxalq Ticar' + @az_schwa + N't ' + @az_E_schwa + N'm' + @az_schwa + N'liyyatlar' + @az_I_dot,
    N'G' + @az_o_dia + N'mr' + @az_u_dia + N'k s' + @az_schwa + N'n' + @az_schwa + N'dl' + @az_schwa + N'rinin haz' + @az_I_dot + N'rlanmas' + @az_I_dot + N'.', NULL, 2, GETDATE()),
(5, N'Kompleks Hesabat v' + @schwa + N' Analiz',
    N'Real vaxt analizi v' + @schwa + N' trend izl' + @schwa + N'm' + @schwa + N'si.',
    N'Avtomatik sifari' + @scedil + N' sistemi.', 3, GETDATE()),
-- 6 Kredit
(6, N'Kredit ' + @az_E_schwa + N'm' + @az_schwa + N'liyyatlar' + @az_I_dot + N' ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si',
    N'Kredit m' + @uuml + N'ra' + @Idot + N'tl' + @schwa + N'rinin idar' + @schwa + N' olunmas' + @Idot + N'.', NULL, 1, GETDATE()),
(6, N'Lombard v' + @az_schwa + N' T' + @az_u_dia + N'hl' + @az_u_dia + N'k' + @az_schwa + N'sizlik ' + @az_E_schwa + N'syalar' + @az_I_dot,
    N'Q' + @Idot + N'ym' + @schwa + N'tl' + @schwa + N'ndirilm' + @schwa + N' v' + @schwa + N' saxlanmas' + @Idot + N'.', NULL, 2, GETDATE()),
(6, N'Risk ' + @az_I_dot + N'dar' + @az_schwa + N'etm' + @az_schwa + N'si v' + @az_schwa + N' Hesabatlar',
    N'Risk analizi v' + @az_schwa + N' x' + @az_schwa + N'b' + @az_schwa + N'rdarl' + @az_I_dot + N'q sistemi.',
    N'Avtomatik ' + @az_o_dia + N'd' + @az_schwa + N'ni' + @az_s_cedil + N' izl' + @az_schwa + N'm' + @az_schwa + N'si.', 3, GETDATE());

-- Employees (7 rows)
SET IDENTITY_INSERT Employees ON;
INSERT INTO Employees (Id, Name, Position, ImageUrl, Phone, Email, LinkedIn, CreatedAt) VALUES
(1, N'Name Surname', N'Ba' + @scedil + N' proqram t' + @schwa + N'rtibat' + @scedil + N's' + @Idot, N'/assets/employee.png', N'+994 50 123 45 67', N'developer@company.com', N'linkedin.com/in/developer', GETDATE()),
(2, N'Name Surname', N'Layih' + @schwa + N' koordinatoru', N'/assets/employee.png', N'+994 50 123 45 68', N'coordinator@company.com', N'linkedin.com/in/coordinator', GETDATE()),
(3, N'Name Surname', N'Ba' + @scedil + N' proqram' + @ccedil + @Idot, N'/assets/employee.png', N'+994 50 123 45 69', N'programmer@company.com', N'linkedin.com/in/programmer', GETDATE()),
(4, N'Name Surname', N'IT m' + @uuml + N't' + @schwa + N'x' + @schwa + N'ssisi', N'/assets/employee.png', N'+994 50 123 45 70', N'specialist@company.com', N'linkedin.com/in/specialist', GETDATE()),
(5, N'Name Surname', N'Layih' + @schwa + N'l' + @schwa + N'r ' + @uuml + N'zr' + @schwa + N' ' + @scedil + @ouml + N'b' + @schwa + N' r' + @schwa + N'hb' + @schwa + N'ri', N'/assets/employee.png', N'+994 50 123 45 71', N'manager@company.com', N'linkedin.com/in/manager', GETDATE()),
(6, N'Name Surname', N'Layih' + @schwa + N' meneceri', N'/assets/employee.png', N'+994 50 123 45 72', N'project-manager@company.com', N'linkedin.com/in/project-manager', GETDATE()),
(7, N'Name Surname', N'SQL Server ' + @uuml + N'zr' + @schwa + N' proqram' + @ccedil + @Idot, N'/assets/employee.png', N'+994 50 123 45 73', N'sql-developer@company.com', N'linkedin.com/in/sql-developer', GETDATE());
SET IDENTITY_INSERT Employees OFF;

-- EquipmentFeatures (for Equipment Ids 1..3)
INSERT INTO EquipmentFeatures (EquipmentId, Feature, OrderIndex, CreatedAt) VALUES
(1, N'T' + @az_u_dia + N'rkiy' + @az_schwa + N' ' + @az_I_dot + N'stehsal' + @az_I_dot + N' Keyfiyy' + @az_schwa + N't', 1, GETDATE()),
(1, N'1 ' + @az_I_dot + N'l R' + @az_schwa + N'smi Z' + @az_schwa + N'man' + @az_schwa + N't', 2, GETDATE()),
(1, N'Wi-Fi Adapter Art' + @az_I_dot + N'rma ' + @az_I_dot + N'mkan' + @az_I_dot, 3, GETDATE()),
(1, N'10.1" Arxa Ekran ' + @az_E_schwa + N'lav' + @az_I_dot + N' ' + @az_I_dot + N'mkan' + @az_I_dot, 4, GETDATE()),
(2, N'T' + @az_u_dia + N'rkiy' + @az_schwa + N' ' + @az_I_dot + N'stehsal' + @az_I_dot + N' Keyfiyy' + @az_schwa + N't', 1, GETDATE()),
(2, N'1 ' + @az_I_dot + N'l R' + @az_schwa + N'smi Z' + @az_schwa + N'man' + @az_schwa + N't', 2, GETDATE()),
(2, N'Wi-Fi Adapter Art' + @az_I_dot + N'rma ' + @az_I_dot + N'mkan' + @az_I_dot, 3, GETDATE()),
(2, N'10.1" Arxa Ekran ' + @az_E_schwa + N'lav' + @az_I_dot + N' ' + @az_I_dot + N'mkan' + @az_I_dot, 4, GETDATE()),
(3, N'T' + @az_u_dia + N'rkiy' + @az_schwa + N' ' + @az_I_dot + N'stehsal' + @az_I_dot + N' Keyfiyy' + @az_schwa + N't', 1, GETDATE()),
(3, N'1 ' + @az_I_dot + N'l R' + @az_schwa + N'smi Z' + @az_schwa + N'man' + @az_schwa + N't', 2, GETDATE()),
(3, N'Wi-Fi Adapter Art' + @az_I_dot + N'rma ' + @az_I_dot + N'mkan' + @az_I_dot, 3, GETDATE()),
(3, N'10.1" Arxa Ekran ' + @az_E_schwa + N'lav' + @az_I_dot + N' ' + @az_I_dot + N'mkan' + @az_I_dot, 4, GETDATE());

-- EquipmentSpecifications (selected rows)
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt) VALUES
(1, N'Model', N'J-1900', 1, GETDATE()),
(1, N'Ekran ' + @az_o_dia + N'l' + @az_c_cedil + @az_u_dia + N's' + @az_u_dia, N'15 inch LED LCD proyeksiyal' + @az_I_dot + N' Kapasitiv panel', 2, GETDATE()),
(1, N'MultiTouch', N'10 barmaq', 3, GETDATE()),
(1, N'Prosessor', N'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(1, N'Yadda' + @az_s_cedil, N'4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(1, N'Saxlama', N'120GB SSD HDD 2.5" /MSATA - 240GB SSD art' + @az_I_dot + N'rma ' + @az_I_dot + N'mkan' + @az_I_dot, 6, GETDATE()),
(1, N' ' + @az_E_schwa + N'm' + @az_schwa + N'liyyat Sistemi', N'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(1, N'Qrafika', N'Intel HD Graphics 4000', 8, GETDATE()),
(1, N' ' + @az_S_cedil + N'b' + @az_schwa + N'k' + @az_schwa, N'10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(1, N'Portlar', N'4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(1, N' ' + @az_o_dia + N'l' + @az_c_cedil + @az_u_dia + N'l' + @az_schwa + N'r', N'400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(1, N' ' + @az_C_cedil + @az_schwa + N'ki', N'2.5 kg', 13, GETDATE());
-- Replicate for EquipmentId 2 and 3 with same values
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt)
SELECT 2, [Key], Value, OrderIndex, GETDATE() FROM EquipmentSpecifications WHERE EquipmentId = 1;
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt)
SELECT 3, [Key], Value, OrderIndex, GETDATE() FROM EquipmentSpecifications WHERE EquipmentId = 1;

COMMIT;
