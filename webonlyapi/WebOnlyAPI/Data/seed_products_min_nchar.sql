-- Minimal Unicode-safe seed for Products using NCHAR codepoints (only Name/Subtext)
BEGIN TRAN;

DELETE FROM Products;
DBCC CHECKIDENT ('Products', RESEED, 0);

DECLARE @schwa NVARCHAR(1) = NCHAR(601);    -- ə
DECLARE @dotlessi NVARCHAR(1) = NCHAR(305); -- ı
DECLARE @s_cedil NVARCHAR(1) = NCHAR(351);  -- ş
DECLARE @I_dot NVARCHAR(1) = NCHAR(304);    -- İ
DECLARE @o_dia NVARCHAR(1) = NCHAR(246);    -- ö
DECLARE @u_dia NVARCHAR(1) = NCHAR(252);    -- ü

SET IDENTITY_INSERT Products ON;
INSERT INTO Products (Id, Name, Subtext, CreatedAt)
VALUES
(1, N'Market', N'Sat' + @dotlessi + @s_cedil + N' v' + @schwa + N' anbar', GETDATE()),
(2, N'Tekstil Modulu', @I_dot + N'stehsal v' + @schwa + N' toxuculuq', GETDATE()),
(3, N'Mobil sat' + @dotlessi + @s_cedil, N'Mobil sat' + @dotlessi + @s_cedil + N' n' + @o_dia + N'qt' + @schwa + N'l' + @schwa + N'ri', GETDATE()),
(4, N'Aptek ' + @I_dot + N'dar' + @schwa + N'etm' + @schwa + N' sistemi', N'D' + @schwa + N'rman v' + @schwa + N' re' + N'ç' + N'et' + @schwa, GETDATE()),
(5, N'Ticar' + @schwa + N't v' + @schwa + N' Anbar', N'B' + @o_dia + N'y' + @u_dia + N'k h' + @schwa + N'cmli ticar' + @schwa + N't', GETDATE()),
(6, N'Kredit v' + @schwa + N' Lombard', N'Maliyy' + @schwa + N' xidm' + @schwa + N'tl' + @schwa + N'ri', GETDATE());
SET IDENTITY_INSERT Products OFF;

COMMIT;
