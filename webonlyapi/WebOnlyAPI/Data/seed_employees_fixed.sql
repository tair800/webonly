-- Unicode-safe seed for Employees using NCHAR codepoints for Azerbaijani characters
BEGIN TRAN;

-- Clear existing
DELETE FROM Employees;
DBCC CHECKIDENT ('Employees', RESEED, 0);

-- Azerbaijani codepoints
DECLARE @schwa NVARCHAR(1) = NCHAR(601);      -- ə
DECLARE @dotlessi NVARCHAR(1) = NCHAR(305);   -- ı
DECLARE @s_cedil NVARCHAR(1) = NCHAR(351);    -- ş
DECLARE @u_dia NVARCHAR(1) = NCHAR(252);      -- ü
DECLARE @o_dia NVARCHAR(1) = NCHAR(246);      -- ö
DECLARE @c_cedil NVARCHAR(1) = NCHAR(231);    -- ç
DECLARE @cap_schwa NVARCHAR(1) = NCHAR(399);  -- Ə
DECLARE @cap_s_cedil NVARCHAR(1) = NCHAR(350); -- Ş
DECLARE @cap_c_cedil NVARCHAR(1) = NCHAR(199); -- Ç

SET IDENTITY_INSERT Employees ON;
INSERT INTO Employees (Id, Name, Position, ImageUrl, Phone, Email, LinkedIn, Description, CreatedAt) VALUES
(1, N'Əli Məmmədov', N'Direktor', N'/assets/director.png', N'+994 50 123 45 67', N'ali.mammadov@webonly.az', N'linkedin.com/in/ali-mammadov', 
 N'10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir.', GETDATE()),

(2, N'Name Surname', N'Ba' + @s_cedil + N' proqram tərtibat' + @s_cedil + @dotlessi + @s_cedil, N'/assets/employee.png', N'+994 50 123 45 68', N'developer@company.com', N'linkedin.com/in/developer', NULL, GETDATE()),

(3, N'Name Surname', N'Layihə koordinatoru', N'/assets/employee.png', N'+994 50 123 45 69', N'coordinator@company.com', N'linkedin.com/in/coordinator', NULL, GETDATE()),

(4, N'Name Surname', N'Ba' + @s_cedil + N' proqram' + @c_cedil + @dotlessi, N'/assets/employee.png', N'+994 50 123 45 70', N'programmer@company.com', N'linkedin.com/in/programmer', NULL, GETDATE()),

(5, N'Name Surname', N'IT m' + @u_dia + N'təxəssisi', N'/assets/employee.png', N'+994 50 123 45 71', N'specialist@company.com', N'linkedin.com/in/specialist', NULL, GETDATE()),

(6, N'Name Surname', N'Layihələr ' + @u_dia + N'zrə ' + @s_cedil + @o_dia + N'bə rəhbəri', N'/assets/employee.png', N'+994 50 123 45 72', N'manager@company.com', N'linkedin.com/in/manager', NULL, GETDATE()),

(7, N'Name Surname', N'Layihə meneceri', N'/assets/employee.png', N'+994 50 123 45 73', N'project-manager@company.com', N'linkedin.com/in/project-manager', NULL, GETDATE()),

(8, N'Name Surname', N'SQL Server ' + @u_dia + N'zrə proqram' + @c_cedil + @dotlessi, N'/assets/employee.png', N'+994 50 123 45 74', N'sql-developer@company.com', N'linkedin.com/in/sql-developer', NULL, GETDATE());
SET IDENTITY_INSERT Employees OFF;

COMMIT;

-- Verify the director was created correctly
SELECT 
    Id,
    Name,
    Position,
    Email,
    Phone,
    LinkedIn,
    ImageUrl,
    Description,
    CreatedAt
FROM Employees 
WHERE Position LIKE N'%direktor%' OR Position LIKE N'%director%';
