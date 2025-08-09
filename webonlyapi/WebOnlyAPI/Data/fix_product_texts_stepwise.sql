SET XACT_ABORT ON;
BEGIN TRAN;

-- Map mojibake -> correct codepoints
-- lowercases
DECLARE @i_dotless NVARCHAR(1)=NCHAR(305);   -- ı
DECLARE @s_cedilla NVARCHAR(1)=NCHAR(351);   -- ş
DECLARE @c_cedilla NVARCHAR(1)=NCHAR(231);   -- ç
DECLARE @o_umlaut NVARCHAR(1)=NCHAR(246);    -- ö
DECLARE @u_umlaut NVARCHAR(1)=NCHAR(252);    -- ü
DECLARE @i_dot NVARCHAR(1)=NCHAR(304);       -- İ (capital I with dot)
DECLARE @schwa NVARCHAR(1)=NCHAR(601);       -- ə
DECLARE @g_breve NVARCHAR(1)=NCHAR(287);     -- ğ

-- uppercases
DECLARE @S_cedilla NVARCHAR(1)=NCHAR(350);   -- Ş
DECLARE @C_cedilla NVARCHAR(1)=NCHAR(199);   -- Ç
DECLARE @O_umlaut NVARCHAR(1)=NCHAR(214);    -- Ö
DECLARE @U_umlaut NVARCHAR(1)=NCHAR(220);    -- Ü
DECLARE @G_breve NVARCHAR(1)=NCHAR(286);     -- Ğ

-- Helper procedure-like block via repeated updates to avoid nested REPLACE syntax errors
-- Fields: DetailDescription, Section1Description, Section2Description, Section3Description, Description

-- A) DetailDescription
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Ä±', @i_dotless) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'ÅŸ', @s_cedilla) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Ã§', @c_cedilla) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Ã¶', @o_umlaut) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Ã¼', @u_umlaut) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Ä°', @i_dot) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'É™', @schwa) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'ÄŸ', @g_breve) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Äž', @G_breve) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Åž', @S_cedilla) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Ã–', @O_umlaut) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Ãœ', @U_umlaut) WHERE DetailDescription IS NOT NULL;
UPDATE Products SET DetailDescription = REPLACE(DetailDescription, N'Ã‡', @C_cedilla) WHERE DetailDescription IS NOT NULL;

-- B) Section1Description
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Ä±', @i_dotless) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'ÅŸ', @s_cedilla) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Ã§', @c_cedilla) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Ã¶', @o_umlaut) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Ã¼', @u_umlaut) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Ä°', @i_dot) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'É™', @schwa) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'ÄŸ', @g_breve) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Äž', @G_breve) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Åž', @S_cedilla) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Ã–', @O_umlaut) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Ãœ', @U_umlaut) WHERE Section1Description IS NOT NULL;
UPDATE Products SET Section1Description = REPLACE(Section1Description, N'Ã‡', @C_cedilla) WHERE Section1Description IS NOT NULL;

-- C) Section2Description
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Ä±', @i_dotless) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'ÅŸ', @s_cedilla) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Ã§', @c_cedilla) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Ã¶', @o_umlaut) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Ã¼', @u_umlaut) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Ä°', @i_dot) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'É™', @schwa) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'ÄŸ', @g_breve) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Äž', @G_breve) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Åž', @S_cedilla) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Ã–', @O_umlaut) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Ãœ', @U_umlaut) WHERE Section2Description IS NOT NULL;
UPDATE Products SET Section2Description = REPLACE(Section2Description, N'Ã‡', @C_cedilla) WHERE Section2Description IS NOT NULL;

-- D) Section3Description
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Ä±', @i_dotless) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'ÅŸ', @s_cedilla) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Ã§', @c_cedilla) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Ã¶', @o_umlaut) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Ã¼', @u_umlaut) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Ä°', @i_dot) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'É™', @schwa) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'ÄŸ', @g_breve) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Äž', @G_breve) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Åž', @S_cedilla) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Ã–', @O_umlaut) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Ãœ', @U_umlaut) WHERE Section3Description IS NOT NULL;
UPDATE Products SET Section3Description = REPLACE(Section3Description, N'Ã‡', @C_cedilla) WHERE Section3Description IS NOT NULL;

-- E) Description (short)
UPDATE Products SET Description = REPLACE(Description, N'Ä±', @i_dotless) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'ÅŸ', @s_cedilla) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Ã§', @c_cedilla) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Ã¶', @o_umlaut) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Ã¼', @u_umlaut) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Ä°', @i_dot) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'É™', @schwa) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'ÄŸ', @g_breve) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Äž', @G_breve) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Åž', @S_cedilla) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Ã–', @O_umlaut) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Ãœ', @U_umlaut) WHERE Description IS NOT NULL;
UPDATE Products SET Description = REPLACE(Description, N'Ã‡', @C_cedilla) WHERE Description IS NOT NULL;

COMMIT;



