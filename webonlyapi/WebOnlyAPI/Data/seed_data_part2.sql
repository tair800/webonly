-- Part 2: Equipment and Slider data
-- Run this after the main seed_data.sql file

-- Insert Equipment
INSERT INTO Equipment (Id, Name, Version, Core, Description, ImageUrl, CreatedAt) VALUES
(1, 'PosClass TX-1500S', 'J-1900', 'İntel Core I5', 'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', '/assets/equipment1.png', GETDATE()),
(2, 'saPosClass TX-1500S', 'J-1900', 'İntel Core I5', 'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', '/assets/equipment1.png', GETDATE()),
(3, 'PosClass TX-1500S', 'J-1900', 'İntel Core I5', 'Satış və xidmət proseslərini sürətləndirən, stabil və etibarlı POS terminal. İnteqrasiya olunmuş kart və RFID oxuyucu ilə təhlükəsiz ödəniş imkanı yaradır.', '/assets/equipment1.png', GETDATE());

-- Insert Equipment Features
INSERT INTO EquipmentFeatures (EquipmentId, Feature, OrderIndex, CreatedAt) VALUES
-- Equipment 1 features
(1, 'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(1, '1 İl Rəsmi Zəmanət', 2, GETDATE()),
(1, 'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(1, '10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE()),

-- Equipment 2 features
(2, 'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(2, '1 İl Rəsmi Zəmanət', 2, GETDATE()),
(2, 'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(2, '10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE()),

-- Equipment 3 features
(3, 'Türkiyə İstehsalı Keyfiyyət', 1, GETDATE()),
(3, '1 İl Rəsmi Zəmanət', 2, GETDATE()),
(3, 'Wi-Fi Adapter Artırma İmkanı', 3, GETDATE()),
(3, '10.1" Arxa Ekran Əlavə İmkanı', 4, GETDATE());

-- Insert Equipment Specifications
INSERT INTO EquipmentSpecifications (EquipmentId, [Key], Value, OrderIndex, CreatedAt) VALUES
-- Equipment 1 specifications
(1, 'Model', 'J-1900', 1, GETDATE()),
(1, 'Ekran Ölçüsü', '15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(1, 'MultiTouch', '10 barmaq', 3, GETDATE()),
(1, 'Prosessor', 'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(1, 'Yaddaş', '4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(1, 'Saxlama', '120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(1, 'Əməliyyat Sistemi', 'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(1, 'Qrafika', 'Intel HD Graphics 4000', 8, GETDATE()),
(1, 'Şəbəkə', '10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(1, 'Portlar', '4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(1, 'Enerji', '12V DC, 65W Power Adapter', 11, GETDATE()),
(1, 'Ölçülər', '400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(1, 'Çəki', '2.5 kg', 13, GETDATE()),

-- Equipment 2 specifications (same as equipment 1)
(2, 'Model', 'J-1900', 1, GETDATE()),
(2, 'Ekran Ölçüsü', '15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(2, 'MultiTouch', '10 barmaq', 3, GETDATE()),
(2, 'Prosessor', 'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(2, 'Yaddaş', '4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(2, 'Saxlama', '120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(2, 'Əməliyyat Sistemi', 'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(2, 'Qrafika', 'Intel HD Graphics 4000', 8, GETDATE()),
(2, 'Şəbəkə', '10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(2, 'Portlar', '4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(2, 'Enerji', '12V DC, 65W Power Adapter', 11, GETDATE()),
(2, 'Ölçülər', '400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(2, 'Çəki', '2.5 kg', 13, GETDATE()),

-- Equipment 3 specifications (same as equipment 1)
(3, 'Model', 'J-1900', 1, GETDATE()),
(3, 'Ekran Ölçüsü', '15 inch LED LCD proyeksiyalı Kapasitiv panel', 2, GETDATE()),
(3, 'MultiTouch', '10 barmaq', 3, GETDATE()),
(3, 'Prosessor', 'Intel BayTrail J1900 2.0 GHZ', 4, GETDATE()),
(3, 'Yaddaş', '4GB DDR3 SODIMM - 8GB (1333/1666 MHz)', 5, GETDATE()),
(3, 'Saxlama', '120GB SSD HDD 2.5" /MSATA - 240GB SSD artırma imkanı', 6, GETDATE()),
(3, 'Əməliyyat Sistemi', 'Microsoft Windows 7, Windows 8.1, Windows 10, Windows 11, Posready 7', 7, GETDATE()),
(3, 'Qrafika', 'Intel HD Graphics 4000', 8, GETDATE()),
(3, 'Şəbəkə', '10/100/1000 Mbps Ethernet, Wi-Fi 802.11 b/g/n', 9, GETDATE()),
(3, 'Portlar', '4x USB 2.0, 2x USB 3.0, 1x HDMI, 1x VGA, 1x RJ45', 10, GETDATE()),
(3, 'Enerji', '12V DC, 65W Power Adapter', 11, GETDATE()),
(3, 'Ölçülər', '400 x 300 x 80 mm (W x D x H)', 12, GETDATE()),
(3, 'Çəki', '2.5 kg', 13, GETDATE());

-- Insert Sliders
INSERT INTO Sliders (Id, Name, ImageUrl, OrderIndex, IsActive, CreatedAt) VALUES
(1, 'slider1', '/assets/slider1.png', 1, 1, GETDATE()),
(2, 'slider2', '/assets/slider2.png', 2, 1, GETDATE()),
(3, 'slider3', '/assets/slider3.png', 3, 1, GETDATE()),
(4, 'slider4', '/assets/slider4.png', 4, 1, GETDATE()),
(5, 'slider5', '/assets/slider5.png', 5, 1, GETDATE()),
(6, 'slider6', '/assets/slider6.png', 6, 1, GETDATE());
