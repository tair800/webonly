-- Clear all data and reset identities (FK-safe order)
SET XACT_ABORT ON;
BEGIN TRAN;

-- Children first
DELETE FROM ServiceArticles;
DELETE FROM ProductSections;
DELETE FROM EquipmentFeatures;
DELETE FROM EquipmentSpecifications;

-- Parents
DELETE FROM Services;
DELETE FROM Products;
DELETE FROM Equipment;
DELETE FROM Sliders;
DELETE FROM Employees;
DELETE FROM [References];

-- Reset identities
DBCC CHECKIDENT ('Services', RESEED, 0);
DBCC CHECKIDENT ('ServiceArticles', RESEED, 0);
DBCC CHECKIDENT ('Products', RESEED, 0);
DBCC CHECKIDENT ('ProductSections', RESEED, 0);
DBCC CHECKIDENT ('Equipment', RESEED, 0);
DBCC CHECKIDENT ('EquipmentFeatures', RESEED, 0);
DBCC CHECKIDENT ('EquipmentSpecifications', RESEED, 0);
DBCC CHECKIDENT ('Sliders', RESEED, 0);
DBCC CHECKIDENT ('Employees', RESEED, 0);
DBCC CHECKIDENT ('[References]', RESEED, 0);

COMMIT;

-- Verify
SELECT COUNT(*) AS Services FROM Services;
SELECT COUNT(*) AS ServiceArticles FROM ServiceArticles;
SELECT COUNT(*) AS Products FROM Products;
SELECT COUNT(*) AS ProductSections FROM ProductSections;
SELECT COUNT(*) AS Equipment FROM Equipment;
SELECT COUNT(*) AS EquipmentFeatures FROM EquipmentFeatures;
SELECT COUNT(*) AS EquipmentSpecifications FROM EquipmentSpecifications;
SELECT COUNT(*) AS Sliders FROM Sliders;
SELECT COUNT(*) AS Employees FROM Employees;
SELECT COUNT(*) AS [References] FROM [References];
