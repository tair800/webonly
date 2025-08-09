-- Fix mojibake in text columns by replacing common broken sequences with proper Azerbaijani characters
SET XACT_ABORT ON;
BEGIN TRAN;

IF OBJECT_ID(N'dbo.FixMojibake', N'FN') IS NOT NULL
    DROP FUNCTION dbo.FixMojibake;
GO

CREATE FUNCTION dbo.FixMojibake(@s NVARCHAR(MAX))
RETURNS NVARCHAR(MAX)
AS
BEGIN
    IF @s IS NULL RETURN NULL;
    -- Apply sequential replacements
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(177), NCHAR(305)); -- Ä± -> ı
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(176), NCHAR(304)); -- Ä° -> İ
    SET @s = REPLACE(@s, NCHAR(201)+NCHAR(8482), NCHAR(601)); -- É™ -> ə
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(167), NCHAR(231)); -- Ã§ -> ç
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(150), NCHAR(214)); -- Ã– -> Ö
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(156), NCHAR(220)); -- Ãœ -> Ü
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(182), NCHAR(246)); -- Ã¶ -> ö
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(188), NCHAR(252)); -- Ã¼ -> ü
    SET @s = REPLACE(@s, NCHAR(197)+NCHAR(158), NCHAR(350)); -- Åž -> Ş
    SET @s = REPLACE(@s, NCHAR(197)+NCHAR(159), NCHAR(351)); -- ÅŸ -> ş
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(135), NCHAR(199)); -- Ã‡ -> Ç
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(159), NCHAR(287)); -- ÄŸ -> ğ
    SET @s = REPLACE(@s, NCHAR(201)+NCHAR(156), NCHAR(399)); -- Éœ -> Ə
    RETURN @s;
END
GO

-- Products
UPDATE Products
SET Name = dbo.FixMojibake(Name),
    Subtext = dbo.FixMojibake(Subtext),
    Description = dbo.FixMojibake(Description);

-- ProductSections
UPDATE ProductSections
SET Title = dbo.FixMojibake(Title),
    Description = dbo.FixMojibake(Description),
    MoreText = dbo.FixMojibake(MoreText);

-- Equipment
UPDATE Equipment
SET Name = dbo.FixMojibake(Name),
    Version = dbo.FixMojibake(Version),
    Core = dbo.FixMojibake(Core),
    Description = dbo.FixMojibake(Description);

-- EquipmentFeatures
UPDATE EquipmentFeatures
SET Feature = dbo.FixMojibake(Feature);

-- EquipmentSpecifications
UPDATE EquipmentSpecifications
SET [Value] = dbo.FixMojibake([Value]);

-- Employees
UPDATE Employees
SET Name = dbo.FixMojibake(Name),
    Position = dbo.FixMojibake(Position);

-- References
UPDATE [References]
SET Name = dbo.FixMojibake(Name),
    Alt = dbo.FixMojibake(Alt);

COMMIT;

-- Quick checks
SELECT TOP 3 Id, Name FROM Products ORDER BY Id;
SELECT TOP 3 Title FROM ProductSections ORDER BY ProductId, OrderIndex;
SELECT TOP 3 Feature FROM EquipmentFeatures ORDER BY EquipmentId, OrderIndex;
SELECT TOP 3 [Value] FROM EquipmentSpecifications ORDER BY EquipmentId, OrderIndex;
SELECT TOP 3 Name, Position FROM Employees ORDER BY Id;
