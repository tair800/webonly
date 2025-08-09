-- Clear non-Services data and reset identities (FK-safe order)
SET XACT_ABORT ON;
BEGIN TRAN;

DELETE FROM ProductSections;
DELETE FROM EquipmentFeatures;
DELETE FROM EquipmentSpecifications;
DELETE FROM Sliders;
DELETE FROM Employees;
DELETE FROM [References];
DELETE FROM Products;
DELETE FROM Equipment;

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
SELECT COUNT(*) AS Products FROM Products;
SELECT COUNT(*) AS ProductSections FROM ProductSections;
SELECT COUNT(*) AS Equipment FROM Equipment;
SELECT COUNT(*) AS EquipmentFeatures FROM EquipmentFeatures;
SELECT COUNT(*) AS EquipmentSpecifications FROM EquipmentSpecifications;
SELECT COUNT(*) AS Sliders FROM Sliders;
SELECT COUNT(*) AS Employees FROM Employees;
SELECT COUNT(*) AS [References] FROM [References];
