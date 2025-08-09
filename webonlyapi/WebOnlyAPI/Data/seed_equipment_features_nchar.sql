-- NCHAR-based reseed for EquipmentFeatures to ensure correct Azerbaijani letters
SET XACT_ABORT ON;
BEGIN TRAN;

DELETE FROM EquipmentFeatures;
DBCC CHECKIDENT ('EquipmentFeatures', RESEED, 0);

-- Azerbaijani codepoints (unique var names for this script)
DECLARE @ef_schwa NVARCHAR(1) = NCHAR(601);    -- ə
DECLARE @ef_Idot NVARCHAR(1) = NCHAR(304);     -- İ
DECLARE @ef_s_cedil NVARCHAR(1) = NCHAR(351);  -- ş
DECLARE @ef_u_dia NVARCHAR(1) = NCHAR(252);    -- ü

-- Common feature texts
DECLARE @feat1 NVARCHAR(200) = N'T' + @ef_u_dia + N'rkiy' + @ef_schwa + N' ' + @ef_Idot + N'stehsal' + @ef_Idot + N' Keyfiyy' + @ef_schwa + N't';
DECLARE @feat2 NVARCHAR(200) = N'1 ' + @ef_Idot + N'l R' + @ef_schwa + N'smi Z' + @ef_schwa + N'man' + @ef_schwa + N't';
DECLARE @feat3 NVARCHAR(200) = N'Wi-Fi Adapter Art' + @ef_Idot + N'rma ' + @ef_Idot + N'mkan' + @ef_Idot;
DECLARE @feat4 NVARCHAR(200) = N'10.1" Arxa Ekran ' + NCHAR(399) + N'lav' + @ef_Idot + N' ' + @ef_Idot + N'mkan' + @ef_Idot; -- Ə

INSERT INTO EquipmentFeatures (EquipmentId, Feature, OrderIndex, CreatedAt) VALUES
(1, @feat1, 1, GETDATE()),
(1, @feat2, 2, GETDATE()),
(1, @feat3, 3, GETDATE()),
(1, @feat4, 4, GETDATE()),
(2, @feat1, 1, GETDATE()),
(2, @feat2, 2, GETDATE()),
(2, @feat3, 3, GETDATE()),
(2, @feat4, 4, GETDATE()),
(3, @feat1, 1, GETDATE()),
(3, @feat2, 2, GETDATE()),
(3, @feat3, 3, GETDATE()),
(3, @feat4, 4, GETDATE());

COMMIT;
