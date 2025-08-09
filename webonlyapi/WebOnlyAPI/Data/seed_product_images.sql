SET XACT_ABORT ON;
BEGIN TRAN;

-- 1) Copy existing single image into ProductImages as the first thumbnail (OrderIndex = 0)
INSERT INTO ProductImages (ProductId, ImageUrl, Alt, OrderIndex)
SELECT p.Id, p.ImageUrl, p.Alt, 0
FROM Products p
WHERE p.ImageUrl IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM ProductImages pi
      WHERE pi.ProductId = p.Id AND pi.OrderIndex = 0
  );

-- 2) Add extra images per product (edit paths if needed)
IF NOT EXISTS (SELECT 1 FROM ProductImages WHERE ProductId = 1 AND ImageUrl = N'/assets/market2.png')
    INSERT INTO ProductImages (ProductId, ImageUrl, Alt, OrderIndex) VALUES (1, N'/assets/market2.png',  N'Market', 1);
IF NOT EXISTS (SELECT 1 FROM ProductImages WHERE ProductId = 1 AND ImageUrl = N'/assets/market3.png')
    INSERT INTO ProductImages (ProductId, ImageUrl, Alt, OrderIndex) VALUES (1, N'/assets/market3.png',  N'Market', 2);

IF NOT EXISTS (SELECT 1 FROM ProductImages WHERE ProductId = 2 AND ImageUrl = N'/assets/textile2.png')
    INSERT INTO ProductImages (ProductId, ImageUrl, Alt, OrderIndex) VALUES (2, N'/assets/textile2.png', N'Tekstil', 1);

IF NOT EXISTS (SELECT 1 FROM ProductImages WHERE ProductId = 3 AND ImageUrl = N'/assets/mobile2.png')
    INSERT INTO ProductImages (ProductId, ImageUrl, Alt, OrderIndex) VALUES (3, N'/assets/mobile2.png',  N'Mobil',   1);

-- Add more rows as your assets exist

COMMIT;

-- Verify
SELECT ProductId, Id, ImageUrl, Alt, OrderIndex
FROM ProductImages
ORDER BY ProductId, OrderIndex, Id;


