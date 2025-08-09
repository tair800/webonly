-- NCHAR-based reseed for EquipmentSpecifications (inline NCHAR, no variables)
SET XACT_ABORT ON;
BEGIN TRAN;

DELETE FROM EquipmentSpecifications;
DBCC CHECKIDENT ('EquipmentSpecifications', RESEED, 0);

-- Insert for EquipmentId = 1
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt) VALUES
(1, N'Model', N'J-1900', 1, GETDATE()),
(1, N'Ekran ' + NCHAR(214) + N'l' + NCHAR(231) + NCHAR(252) + N's' + NCHAR(252), N'15 inch LED LCD proyeksiyal' + NCHAR(304) + N' Kapasitiv panel', 2, GETDATE()),
(1, N'MultiTouch', N'10 barmaq', 3, GETDATE()),
(1, N'Prosessor', N'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(1, N'Yadda' + NCHAR(351), N'4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(1, N'Saxlama', N'120GB SSD HDD 2.5" /MSATA - 240GB SSD art' + NCHAR(304) + N'rma ' + NCHAR(304) + N'mkan' + NCHAR(304), 6, GETDATE()),
(1, N'' + NCHAR(399) + N'm' + NCHAR(601) + N'liyyat Sistemi', N'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(1, N'Qrafika', N'Intel HD Graphics 4000', 8, GETDATE()),
(1, N'' + NCHAR(350) + N'b' + NCHAR(601) + N'k' + NCHAR(601), N'10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(1, N'Portlar', N'4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(1, N'Enerji', N'12V DC, 65W Power Adapter', 11, GETDATE()),
(1, N'' + NCHAR(214) + N'l' + NCHAR(231) + NCHAR(252) + N'l' + NCHAR(601) + N'r', N'400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(1, N'' + NCHAR(199) + NCHAR(601) + N'ki', N'2.5 kg', 13, GETDATE());

-- Copy same rows to EquipmentId = 2 and 3
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt)
SELECT 2, [Key], Value, OrderIndex, GETDATE() FROM EquipmentSpecifications WHERE EquipmentId = 1;
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt)
SELECT 3, [Key], Value, OrderIndex, GETDATE() FROM EquipmentSpecifications WHERE EquipmentId = 1;

COMMIT;
