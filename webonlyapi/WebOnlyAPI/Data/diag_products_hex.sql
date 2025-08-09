SET NOCOUNT ON;

PRINT N'== products.name ==';
SELECT id, name, sys.fn_varbintohexstr(CONVERT(varbinary(max), name)) AS hex FROM dbo.products ORDER BY id;

PRINT N'== products.subtext ==';
SELECT id, subtext, sys.fn_varbintohexstr(CONVERT(varbinary(max), subtext)) AS hex FROM dbo.products ORDER BY id;

PRINT N'== products.description (first 200 chars) ==';
SELECT id,
       LEFT(description, 200) AS description_preview,
       sys.fn_varbintohexstr(CONVERT(varbinary(max), LEFT(description, 200))) AS hex
FROM dbo.products ORDER BY id;

IF OBJECT_ID(N'dbo.product_sections', N'U') IS NOT NULL
BEGIN
  PRINT N'== product_sections.title ==';
  SELECT product_id, title, sys.fn_varbintohexstr(CONVERT(varbinary(max), title)) AS hex
  FROM dbo.product_sections ORDER BY product_id, id;

  PRINT N'== product_sections.description (first 200) ==';
  SELECT product_id, LEFT(description, 200) AS description_preview,
         sys.fn_varbintohexstr(CONVERT(varbinary(max), LEFT(description, 200))) AS hex
  FROM dbo.product_sections ORDER BY product_id, id;
END

IF OBJECT_ID(N'dbo.product_section_images', N'U') IS NOT NULL
BEGIN
  PRINT N'== product_section_images.image_path ==';
  SELECT product_id, image_path, sys.fn_varbintohexstr(CONVERT(varbinary(max), image_path)) AS hex
  FROM dbo.product_section_images ORDER BY product_id, id;
END


