SET XACT_ABORT ON;
BEGIN TRAN;

-- Replace common mojibake sequences with proper Azerbaijani letters using NCHAR codepoints
-- Applies to all rows; preserves NULLs

UPDATE Products SET
  DetailDescription = CASE WHEN DetailDescription IS NULL THEN NULL ELSE 
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(DetailDescription,
      N'Ä±', NCHAR(305)), N'ÅŸ', NCHAR(351)), N'Ã§', NCHAR(231)), N'Ã¶', NCHAR(246)), N'Ã¼', NCHAR(252)),
      N'Ä°', NCHAR(304)), N'É™', NCHAR(601)), N'ÄŸ', NCHAR(287)), N'Äž', NCHAR(286)), N'Åž', NCHAR(350)),
      N'Ã–', NCHAR(214))) END,
  Section1Description = CASE WHEN Section1Description IS NULL THEN NULL ELSE 
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Section1Description,
      N'Ä±', NCHAR(305)), N'ÅŸ', NCHAR(351)), N'Ã§', NCHAR(231)), N'Ã¶', NCHAR(246)), N'Ã¼', NCHAR(252)),
      N'Ä°', NCHAR(304)), N'É™', NCHAR(601)), N'ÄŸ', NCHAR(287)), N'Äž', NCHAR(286)), N'Åž', NCHAR(350)),
      N'Ã–', NCHAR(214))) END,
  Section2Description = CASE WHEN Section2Description IS NULL THEN NULL ELSE 
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Section2Description,
      N'Ä±', NCHAR(305)), N'ÅŸ', NCHAR(351)), N'Ã§', NCHAR(231)), N'Ã¶', NCHAR(246)), N'Ã¼', NCHAR(252)),
      N'Ä°', NCHAR(304)), N'É™', NCHAR(601)), N'ÄŸ', NCHAR(287)), N'Äž', NCHAR(286)), N'Åž', NCHAR(350)),
      N'Ã–', NCHAR(214))) END,
  Section3Description = CASE WHEN Section3Description IS NULL THEN NULL ELSE 
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Section3Description,
      N'Ä±', NCHAR(305)), N'ÅŸ', NCHAR(351)), N'Ã§', NCHAR(231)), N'Ã¶', NCHAR(246)), N'Ã¼', NCHAR(252)),
      N'Ä°', NCHAR(304)), N'É™', NCHAR(601)), N'ÄŸ', NCHAR(287)), N'Äž', NCHAR(286)), N'Åž', NCHAR(350)),
      N'Ã–', NCHAR(214))) END,
  Description = CASE WHEN Description IS NULL THEN NULL ELSE 
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Description,
      N'Ä±', NCHAR(305)), N'ÅŸ', NCHAR(351)), N'Ã§', NCHAR(231)), N'Ã¶', NCHAR(246)), N'Ã¼', NCHAR(252)),
      N'Ä°', NCHAR(304)), N'É™', NCHAR(601)), N'ÄŸ', NCHAR(287)), N'Äž', NCHAR(286)), N'Åž', NCHAR(350)),
      N'Ã–', NCHAR(214))) END;

COMMIT;


