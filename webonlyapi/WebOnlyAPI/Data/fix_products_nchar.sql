SET XACT_ABORT ON;
BEGIN TRAN;

-- Replace common mojibake sequences with correct Azerbaijani Unicode codepoints
-- Columns: name, subtext, description

-- name
UPDATE dbo.products SET name = REPLACE(name, N'Â', N'') WHERE name IS NOT NULL;
UPDATE dbo.products SET name = REPLACE(name, N'Ä±', NCHAR(305)) WHERE name IS NOT NULL; -- ı
UPDATE dbo.products SET name = REPLACE(name, N'ÅŸ', NCHAR(351)) WHERE name IS NOT NULL; -- ş
UPDATE dbo.products SET name = REPLACE(name, N'Ã§', NCHAR(231)) WHERE name IS NOT NULL; -- ç
UPDATE dbo.products SET name = REPLACE(name, N'Ã¶', NCHAR(246)) WHERE name IS NOT NULL; -- ö
UPDATE dbo.products SET name = REPLACE(name, N'Ã¼', NCHAR(252)) WHERE name IS NOT NULL; -- ü
UPDATE dbo.products SET name = REPLACE(name, N'Ä°', NCHAR(304)) WHERE name IS NOT NULL; -- İ
UPDATE dbo.products SET name = REPLACE(name, N'É™', NCHAR(601)) WHERE name IS NOT NULL; -- ə
UPDATE dbo.products SET name = REPLACE(name, N'ÄŸ', NCHAR(287)) WHERE name IS NOT NULL; -- ğ
UPDATE dbo.products SET name = REPLACE(name, N'Äž', NCHAR(286)) WHERE name IS NOT NULL; -- Ğ
UPDATE dbo.products SET name = REPLACE(name, N'Åž', NCHAR(350)) WHERE name IS NOT NULL; -- Ş
UPDATE dbo.products SET name = REPLACE(name, N'Ã–', NCHAR(214)) WHERE name IS NOT NULL; -- Ö
UPDATE dbo.products SET name = REPLACE(name, N'Ãœ', NCHAR(220)) WHERE name IS NOT NULL; -- Ü
UPDATE dbo.products SET name = REPLACE(name, N'Ã‡', NCHAR(199)) WHERE name IS NOT NULL; -- Ç

-- subtext
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Â', N'') WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Ä±', NCHAR(305)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'ÅŸ', NCHAR(351)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Ã§', NCHAR(231)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Ã¶', NCHAR(246)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Ã¼', NCHAR(252)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Ä°', NCHAR(304)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'É™', NCHAR(601)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'ÄŸ', NCHAR(287)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Äž', NCHAR(286)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Åž', NCHAR(350)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Ã–', NCHAR(214)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Ãœ', NCHAR(220)) WHERE subtext IS NOT NULL;
UPDATE dbo.products SET subtext = REPLACE(subtext, N'Ã‡', NCHAR(199)) WHERE subtext IS NOT NULL;

-- description
UPDATE dbo.products SET description = REPLACE(description, N'Â', N'') WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Ä±', NCHAR(305)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'ÅŸ', NCHAR(351)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Ã§', NCHAR(231)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Ã¶', NCHAR(246)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Ã¼', NCHAR(252)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Ä°', NCHAR(304)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'É™', NCHAR(601)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'ÄŸ', NCHAR(287)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Äž', NCHAR(286)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Åž', NCHAR(350)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Ã–', NCHAR(214)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Ãœ', NCHAR(220)) WHERE description IS NOT NULL;
UPDATE dbo.products SET description = REPLACE(description, N'Ã‡', NCHAR(199)) WHERE description IS NOT NULL;

COMMIT;


