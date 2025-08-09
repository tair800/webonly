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
    -- remove stray control/marker
    SET @s = REPLACE(@s, NCHAR(194), N'');        -- Â

    -- Common UTF-8 -> cp1252 mojibake pairs
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(177), NCHAR(305)); -- Ä± -> ı
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(176), NCHAR(304)); -- Ä° -> İ
    SET @s = REPLACE(@s, NCHAR(201)+NCHAR(153), NCHAR(601)); -- É™ -> ə
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(167), NCHAR(231)); -- Ã§ -> ç
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(182), NCHAR(246)); -- Ã¶ -> ö
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(188), NCHAR(252)); -- Ã¼ -> ü
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(150), NCHAR(214)); -- Ã– -> Ö
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(156), NCHAR(220)); -- Ãœ -> Ü
    SET @s = REPLACE(@s, NCHAR(195)+NCHAR(135), NCHAR(199)); -- Ã‡ -> Ç
    SET @s = REPLACE(@s, NCHAR(197)+NCHAR(159), NCHAR(351)); -- ÅŸ -> ş
    SET @s = REPLACE(@s, NCHAR(197)+NCHAR(158), NCHAR(350)); -- Åž -> Ş
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(159), NCHAR(287)); -- ÄŸ -> ğ
    SET @s = REPLACE(@s, NCHAR(196)+NCHAR(158), NCHAR(286)); -- Äž -> Ğ

    -- Capital schwa variants
    SET @s = REPLACE(@s, NCHAR(201)+NCHAR(156), NCHAR(399)); -- Éœ -> Ə
    SET @s = REPLACE(@s, NCHAR(198)+NCHAR(143), NCHAR(399)); -- Æ -> Ə

    RETURN @s;
END
GO

-- Apply to snake_case tables
UPDATE dbo.products
SET name = dbo.FixMojibake(name),
    subtext = dbo.FixMojibake(subtext),
    description = dbo.FixMojibake(description);

IF OBJECT_ID(N'dbo.product_sections', N'U') IS NOT NULL
BEGIN
    UPDATE dbo.product_sections
    SET title = dbo.FixMojibake(title),
        description = dbo.FixMojibake(description),
        more_text = dbo.FixMojibake(more_text);
END

COMMIT;


