-- NCHAR-based reseed for Equipment to fix Azerbaijani characters
SET XACT_ABORT ON;
BEGIN TRAN;

DELETE FROM Equipment;
DBCC CHECKIDENT ('Equipment', RESEED, 0);

DECLARE @e_schwa NVARCHAR(1) = NCHAR(601);    -- ə
DECLARE @e_Idot NVARCHAR(1) = NCHAR(304);     -- İ
DECLARE @e_s_cedil NVARCHAR(1) = NCHAR(351);  -- ş
DECLARE @e_c_cedil NVARCHAR(1) = NCHAR(231);  -- ç
DECLARE @e_u_dia NVARCHAR(1) = NCHAR(252);    -- ü
DECLARE @e_o_dia NVARCHAR(1) = NCHAR(246);    -- ö

SET IDENTITY_INSERT Equipment ON;

INSERT INTO Equipment (Id, Name, Version, Core, Description, ImageUrl, CreatedAt)
VALUES
(1,
 N'PosClass TX-1500S',
 N'J-1900',
 @e_Idot + N'ntel Core I5',
 N'Sat' + @e_s_cedil + N' v' + @e_schwa + N' xidm' + @e_schwa + N't prosesl' + @e_schwa + N'rini s' + @e_c_cedil + N'ra' + @e_schwa + N'tl' + @e_schwa + N'ndir' + @e_schwa + N'n, stabil v' + @e_schwa + N' etibarl' + @e_schwa + N' POS terminal. ' +
 N' ' + @e_Idot + N'nteqrasiya olunmu' + @e_s_cedil + N' kart v' + @e_schwa + N' RFID oxuyucu il' + @e_schwa + N' t' + @e_u_dia + N'hl' + @e_u_dia + N'k' + @e_schwa + N'siz ' + @e_o_dia + N'd' + @e_schwa + N'ni' + @e_s_cedil + N' imkan' + @e_schwa + N' yarad' + @e_schwa + N'r.',
 N'/assets/equipment1.png', GETDATE()),
(2,
 N'saPosClass TX-1500S',
 N'J-1900',
 @e_Idot + N'ntel Core I5',
 N'Sat' + @e_s_cedil + N' v' + @e_schwa + N' xidm' + @e_schwa + N't prosesl' + @e_schwa + N'rini s' + @e_c_cedil + N'ra' + @e_schwa + N'tl' + @e_schwa + N'ndir' + @e_schwa + N'n, stabil v' + @e_schwa + N' etibarl' + @e_schwa + N' POS terminal. ' +
 N' ' + @e_Idot + N'nteqrasiya olunmu' + @e_schwa + N' kart v' + @e_schwa + N' RFID oxuyucu il' + @e_schwa + N' t' + @e_u_dia + N'hl' + @e_u_dia + N'k' + @e_schwa + N'siz ' + @e_o_dia + N'd' + @e_schwa + N'ni' + @e_s_cedil + N' imkan' + @e_schwa + N' yarad' + @e_schwa + N'r.',
 N'/assets/equipment1.png', GETDATE()),
(3,
 N'PosClass TX-1500S',
 N'J-1900',
 @e_Idot + N'ntel Core I5',
 N'Sat' + @e_s_cedil + N' v' + @e_schwa + N' xidm' + @e_schwa + N't prosesl' + @e_schwa + N'rini s' + @e_c_cedil + N'ra' + @e_schwa + N'tl' + @e_schwa + N'ndir' + @e_schwa + N'n, stabil v' + @e_schwa + N' etibarl' + @e_schwa + N' POS terminal. ' +
 N' ' + @e_Idot + N'nteqrasiya olunmu' + @e_schwa + N' kart v' + @e_schwa + N' RFID oxuyucu il' + @e_schwa + N' t' + @e_u_dia + N'hl' + @e_u_dia + N'k' + @e_schwa + N'siz ' + @e_o_dia + N'd' + @e_schwa + N'ni' + @e_s_cedil + N' imkan' + @e_schwa + N' yarad' + @e_schwa + N'r.',
 N'/assets/equipment1.png', GETDATE());

SET IDENTITY_INSERT Equipment OFF;

COMMIT;
