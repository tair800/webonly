-- NCHAR-based reseed for Employees to ensure correct Azerbaijani letters
SET XACT_ABORT ON;
BEGIN TRAN;

DELETE FROM Employees;
DBCC CHECKIDENT ('Employees', RESEED, 0);

-- Azerbaijani codepoints
DECLARE @e_schwa NVARCHAR(1) = NCHAR(601);    -- ə
DECLARE @e_dotlessi NVARCHAR(1) = NCHAR(305); -- ı
DECLARE @e_s_cedil NVARCHAR(1) = NCHAR(351);  -- ş
DECLARE @e_u_dia NVARCHAR(1) = NCHAR(252);    -- ü
DECLARE @e_o_dia NVARCHAR(1) = NCHAR(246);    -- ö
DECLARE @e_c_cedil NVARCHAR(1) = NCHAR(231);  -- ç

SET IDENTITY_INSERT Employees ON;
INSERT INTO Employees (Id, Name, Position, ImageUrl, Phone, Email, LinkedIn, CreatedAt) VALUES
(1, N'Name Surname', N'Ba' + @e_s_cedil + N' proqram t' + @e_schwa + N'rtibat' + @e_s_cedil + N's' + @e_dotlessi, N'/assets/employee.png', N'+994 50 123 45 67', N'developer@company.com', N'linkedin.com/in/developer', GETDATE()),
(2, N'Name Surname', N'Layih' + @e_schwa + N' koordinatoru', N'/assets/employee.png', N'+994 50 123 45 68', N'coordinator@company.com', N'linkedin.com/in/coordinator', GETDATE()),
(3, N'Name Surname', N'Ba' + @e_s_cedil + N' proqram' + @e_c_cedil + @e_dotlessi, N'/assets/employee.png', N'+994 50 123 45 69', N'programmer@company.com', N'linkedin.com/in/programmer', GETDATE()),
(4, N'Name Surname', N'IT m' + @e_u_dia + N't' + @e_schwa + N'x' + @e_schwa + N'ssisi', N'/assets/employee.png', N'+994 50 123 45 70', N'specialist@company.com', N'linkedin.com/in/specialist', GETDATE()),
(5, N'Name Surname', N'Layih' + @e_schwa + N'l' + @e_schwa + N'r ' + @e_u_dia + N'zr' + @e_schwa + N' ' + @e_s_cedil + @e_o_dia + N'b' + @e_schwa + N' r' + @e_schwa + N'hb' + @e_schwa + N'ri', N'/assets/employee.png', N'+994 50 123 45 71', N'manager@company.com', N'linkedin.com/in/manager', GETDATE()),
(6, N'Name Surname', N'Layih' + @e_schwa + N' meneceri', N'/assets/employee.png', N'+994 50 123 45 72', N'project-manager@company.com', N'linkedin.com/in/project-manager', GETDATE()),
(7, N'Name Surname', N'SQL Server ' + @e_u_dia + N'zr' + @e_schwa + N' proqram' + @e_c_cedil + @e_dotlessi, N'/assets/employee.png', N'+994 50 123 45 73', N'sql-developer@company.com', N'linkedin.com/in/sql-developer', GETDATE());
SET IDENTITY_INSERT Employees OFF;

COMMIT;
