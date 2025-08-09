-- NCHAR-based reseed for EquipmentSpecifications to guarantee correct Azerbaijani letters
SET XACT_ABORT ON;
BEGIN TRAN;

DELETE FROM EquipmentSpecifications;
DBCC CHECKIDENT ('EquipmentSpecifications', RESEED, 0);

-- Azerbaijani codepoints (unique names for this batch)
DECLARE @es_schwa NVARCHAR(1) = NCHAR(601);     -- ə
DECLARE @es_I_dot NVARCHAR(1) = NCHAR(304);      -- İ
DECLARE @es_o_dia NVARCHAR(1) = NCHAR(246);      -- ö
DECLARE @es_u_dia NVARCHAR(1) = NCHAR(252);      -- ü
DECLARE @es_O_dia NVARCHAR(1) = NCHAR(214);      -- Ö
DECLARE @es_U_dia NVARCHAR(1) = NCHAR(220);      -- Ü
DECLARE @es_c_cedil NVARCHAR(1) = NCHAR(231);    -- ç
DECLARE @es_C_cedil NVARCHAR(1) = NCHAR(199);    -- Ç
DECLARE @es_S_cedil NVARCHAR(1) = NCHAR(350);    -- Ş
DECLARE @es_s_cedil NVARCHAR(1) = NCHAR(351);    -- ş

-- Helper literals for keys
DECLARE @kModel NVARCHAR(100) = N'Model';
DECLARE @kEkranOlcusu NVARCHAR(100) = N'Ekran ' + @es_O_dia + N'l' + @es_c_cedil + @es_u_dia + N's' + @es_u_dia; -- Ekran Ölçüsü
DECLARE @kMultiTouch NVARCHAR(100) = N'MultiTouch';
DECLARE @kProsessor NVARCHAR(100) = N'Prosessor';
DECLARE @kYaddas NVARCHAR(100) = N'Yadda' + @es_s_cedil; -- Yaddaş
DECLARE @kSaxlama NVARCHAR(100) = N'Saxlama';
DECLARE @kEmeliyyatSistemi NVARCHAR(100) = @es_E_schwa + N'm' + @es_schwa + N'liyyat Sistemi'; -- Əməliyyat Sistemi
DECLARE @kQrafika NVARCHAR(100) = N'Qrafika';
DECLARE @kSebeke NVARCHAR(100) = @es_S_cedil + N'b' + @es_schwa + N'k' + @es_schwa; -- Şəbəkə
DECLARE @kPortlar NVARCHAR(100) = N'Portlar';
DECLARE @kEnerji NVARCHAR(100) = N'Enerji';
DECLARE @kOlculer NVARCHAR(100) = @es_O_dia + N'l' + @es_c_cedil + @es_u_dia + N'l' + @es_schwa + N'r'; -- Ölçülər
DECLARE @kCeki NVARCHAR(100) = @es_C_cedil + @es_schwa + N'ki'; -- Çəki

-- Values for equipment 1
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt) VALUES
(1, @kModel, N'J-1900', 1, GETDATE()),
(1, @kEkranOlcusu, N'15 inch LED LCD proyeksiyal' + @es_I_dot + N' Kapasitiv panel', 2, GETDATE()),
(1, @kMultiTouch, N'10 barmaq', 3, GETDATE()),
(1, @kProsessor, N'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(1, @kYaddas, N'4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(1, @kSaxlama, N'120GB SSD HDD 2.5" /MSATA - 240GB SSD art' + @es_I_dot + N'rma ' + @es_I_dot + N'mkan' + @es_I_dot, 6, GETDATE()),
(1, @kEmeliyyatSistemi, N'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(1, @kQrafika, N'Intel HD Graphics 4000', 8, GETDATE()),
(1, @kSebeke, N'10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(1, @kPortlar, N'4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(1, @kEnerji, N'12V DC, 65W Power Adapter', 11, GETDATE()),
(1, @kOlculer, N'400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(1, @kCeki, N'2.5 kg', 13, GETDATE());

-- Copy same specs to equipment 2 and 3
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt)
SELECT 2, [Key], Value, OrderIndex, GETDATE() FROM EquipmentSpecifications WHERE EquipmentId = 1;
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt)
SELECT 3, [Key], Value, OrderIndex, GETDATE() FROM EquipmentSpecifications WHERE EquipmentId = 1;

COMMIT;
