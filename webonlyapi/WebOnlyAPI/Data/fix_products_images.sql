-- Populate Products image/icon/path fields
SET XACT_ABORT ON;
BEGIN TRAN;

UPDATE Products SET Icon=N'/assets/market-icon.png', Alt=N'Market', Path=N'/market', MainImage=N'/assets/market1.png', ImageUrl=N'/assets/market1.png' WHERE Id=1;
UPDATE Products SET Icon=N'/assets/textile.png', Alt=N'Tekstil', Path=N'/textile', MainImage=N'/assets/market1.png', ImageUrl=N'/assets/market1.png' WHERE Id=2;
UPDATE Products SET Icon=N'/assets/mobile.png', Alt=N'Mobil', Path=N'/mobile', MainImage=N'/assets/market1.png', ImageUrl=N'/assets/market1.png' WHERE Id=3;
UPDATE Products SET Icon=N'/assets/medicine.png', Alt=N'Aptek', Path=N'/medicine', MainImage=N'/assets/market1.png', ImageUrl=N'/assets/market1.png' WHERE Id=4;
UPDATE Products SET Icon=N'/assets/factory.png', Alt=N'Fabrika', Path=N'/factory', MainImage=N'/assets/market1.png', ImageUrl=N'/assets/market1.png' WHERE Id=5;
UPDATE Products SET Icon=N'/assets/credit.png', Alt=N'Kredit', Path=N'/credit', MainImage=N'/assets/market1.png', ImageUrl=N'/assets/market1.png' WHERE Id=6;

COMMIT;

-- Verify
SELECT Id, Name, Icon, Alt, Path, MainImage, ImageUrl FROM Products ORDER BY Id;
