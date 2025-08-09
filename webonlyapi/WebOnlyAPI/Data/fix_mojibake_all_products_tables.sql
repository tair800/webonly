SET XACT_ABORT ON;
BEGIN TRAN;

-- Ensure fixer function exists with comprehensive mappings
IF OBJECT_ID(N'dbo.FixMojibake', N'FN') IS NOT NULL
    DROP FUNCTION dbo.FixMojibake;
GO

CREATE FUNCTION dbo.FixMojibake(@s NVARCHAR(MAX))
RETURNS NVARCHAR(MAX)
AS
BEGIN
    IF @s IS NULL RETURN NULL;
    -- remove stray control/marker
    SET @s = REPLACE(@s, NCHAR(194), N'');        -- Â

    -- Common UTF-8 -> cp1252 mojibake pairs
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(177), NCHAR(305)); -- Ä± -> ı
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(176), NCHAR(304)); -- Ä° -> İ
    -- Lowercase schwa: É™ (U+00C9 U+2122) -> ə (U+0259)
    SET @s = REPLACE(@s, NCHAR(201)+NCHAR(8482), NCHAR(601)); -- É™ -> ə
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(167), NCHAR(231)); -- Ã§ -> ç
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(182), NCHAR(246)); -- Ã¶ -> ö
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(188), NCHAR(252)); -- Ã¼ -> ü
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(8211), NCHAR(214)); -- Ã– -> Ö (en-dash)
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(339), NCHAR(220));  -- Ãœ -> Ü (œ)
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(135), NCHAR(199)); -- Ã‡ -> Ç
    SET @s = REPLACE(@s, NCHAR(197)+NCHAR(159), NCHAR(351)); -- ÅŸ -> ş
    SET @s = REPLACE(@s, NCHAR(197)+NCHAR(158), NCHAR(350)); -- Åž -> Ş
    -- Additional variant observed in DB: ÅŸ rendered as ÅŸ with second char = U+0178 (Ÿ)
    SET @s = REPLACE(@s, NCHAR(197)+NCHAR(376), NCHAR(351)); -- ÅŸ(Ÿ) -> ş
    -- Possible uppercase variant with U+017D (Ž)
    SET @s = REPLACE(@s, NCHAR(197)+NCHAR(381), NCHAR(350)); -- Åž(Ž) -> Ş
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(159), NCHAR(287)); -- ÄŸ -> ğ
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(158), NCHAR(286)); -- Äž -> Ğ
    -- Capital schwa variants
    SET @s = REPLACE(@s, NCHAR(201)+NCHAR(339), NCHAR(399)); -- Éœ -> Ə (œ)
    SET @s = REPLACE(@s, NCHAR(198)+NCHAR(143), NCHAR(399)); -- Æ -> Ə
    RETURN @s;
END
GO

DECLARE @sql NVARCHAR(MAX) = N'';

-- Build dynamic updates for all NVARCHAR columns in products
SELECT @sql = @sql + N'UPDATE p SET ' +
       STRING_AGG(QUOTENAME(c.name) + N' = dbo.FixMojibake(' + QUOTENAME(c.name) + N')', N', ')
       + N' FROM dbo.products AS p;' + CHAR(13)+CHAR(10)
FROM sys.columns AS c
JOIN sys.types AS t ON c.user_type_id = t.user_type_id
WHERE c.object_id = OBJECT_ID(N'dbo.products') AND t.name LIKE N'nvarchar%';

-- product_sections
IF OBJECT_ID(N'dbo.product_sections', N'U') IS NOT NULL
BEGIN
    SELECT @sql = @sql + N'UPDATE s SET ' +
           STRING_AGG(QUOTENAME(c.name) + N' = dbo.FixMojibake(' + QUOTENAME(c.name) + N')', N', ')
           + N' FROM dbo.product_sections AS s;' + CHAR(13)+CHAR(10)
    FROM sys.columns AS c
    JOIN sys.types AS t ON c.user_type_id = t.user_type_id
    WHERE c.object_id = OBJECT_ID(N'dbo.product_sections') AND t.name LIKE N'nvarchar%';
END

-- product_section_images
IF OBJECT_ID(N'dbo.product_section_images', N'U') IS NOT NULL
BEGIN
    SELECT @sql = @sql + N'UPDATE si SET ' +
           STRING_AGG(QUOTENAME(c.name) + N' = dbo.FixMojibake(' + QUOTENAME(c.name) + N')', N', ')
           + N' FROM dbo.product_section_images AS si;' + CHAR(13)+CHAR(10)
    FROM sys.columns AS c
    JOIN sys.types AS t ON c.user_type_id = t.user_type_id
    WHERE c.object_id = OBJECT_ID(N'dbo.product_section_images') AND t.name LIKE N'nvarchar%';
END

EXEC sp_executesql @sql;

COMMIT;


