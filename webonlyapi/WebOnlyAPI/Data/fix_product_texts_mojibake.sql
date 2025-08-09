SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @dotlessI NVARCHAR(1)=NCHAR(305), @cedillaS NVARCHAR(1)=NCHAR(351), @cedillaC NVARCHAR(1)=NCHAR(231),
        @umlautO NVARCHAR(1)=NCHAR(246), @umlautU NVARCHAR(1)=NCHAR(252), @IWithDot NVARCHAR(1)=NCHAR(304),
        @schwa NVARCHAR(1)=NCHAR(601);

-- Helper macro via nested REPLACE to fix common mojibake (UTF-8 misread as Latin-1)
-- Ä± -> ı, ÅŸ -> ş, Ã§ -> ç, Ã¶ -> ö, Ã¼ -> ü, Ä° -> İ, É™ -> ə

UPDATE Products
SET DetailDescription = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(DetailDescription,
        N'Ä±', @dotlessI), N'ÅŸ', @cedillaS), N'Ã§', @cedillaC), N'Ã¶', @umlautO), N'Ã¼', @umlautU), N'Ä°', @IWithDot), N'É™', @schwa),
    Section1Description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Section1Description,
        N'Ä±', @dotlessI), N'ÅŸ', @cedillaS), N'Ã§', @cedillaC), N'Ã¶', @umlautO), N'Ã¼', @umlautU), N'Ä°', @IWithDot), N'É™', @schwa),
    Section2Description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Section2Description,
        N'Ä±', @dotlessI), N'ÅŸ', @cedillaS), N'Ã§', @cedillaC), N'Ã¶', @umlautO), N'Ã¼', @umlautU), N'Ä°', @IWithDot), N'É™', @schwa),
    Section3Description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Section3Description,
        N'Ä±', @dotlessI), N'ÅŸ', @cedillaS), N'Ã§', @cedillaC), N'Ã¶', @umlautO), N'Ã¼', @umlautU), N'Ä°', @IWithDot), N'É™', @schwa),
    Description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Description,
        N'Ä±', @dotlessI), N'ÅŸ', @cedillaS), N'Ã§', @cedillaC), N'Ã¶', @umlautO), N'Ã¼', @umlautU), N'Ä°', @IWithDot), N'É™', @schwa)
WHERE DetailDescription LIKE N'%Ä%' OR Section1Description LIKE N'%Ä%' OR Section2Description LIKE N'%Ä%' OR Section3Description LIKE N'%Ä%'
   OR DetailDescription LIKE N'%Ã%' OR Section1Description LIKE N'%Ã%' OR Section2Description LIKE N'%Ã%' OR Section3Description LIKE N'%Ã%'
   OR DetailDescription LIKE N'%É%' OR Section1Description LIKE N'%É%' OR Section2Description LIKE N'%É%' OR Section3Description LIKE N'%É%'
   OR Description LIKE N'%Ä%' OR Description LIKE N'%Ã%' OR Description LIKE N'%É%';

COMMIT;


