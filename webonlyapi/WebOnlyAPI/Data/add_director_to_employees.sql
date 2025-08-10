-- Add director to Employees table
-- First, check if director already exists
IF NOT EXISTS (SELECT 1 FROM Employees WHERE Position LIKE N'%direktor%' OR Position LIKE N'%director%')
BEGIN
    -- Insert new director employee
    INSERT INTO Employees (
        Name, 
        Position, 
        Email, 
        Phone, 
        LinkedIn, 
        ImageUrl, 
        Description
    ) VALUES (
        N'Əli Məmmədov',  -- Name
        N'Direktor',       -- Position
        N'ali.mammadov@webonly.az',  -- Email
        N'+994 50 123 45 67',       -- Phone
        N'https://linkedin.com/in/ali-mammadov',  -- LinkedIn
        N'/assets/director.png',     -- Image URL
        N'10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir.'  -- Description
    );
    
    PRINT N'Director added successfully';
END
ELSE
BEGIN
    -- Update existing director with description if missing
    UPDATE Employees 
    SET Description = N'10 illik təcrübəsi ilə ERP proqramlarının tətbiqi və avadanlıq satışı sahəsində fəaliyyət göstərir. 500-dən çox uğurlu layihə, restoranlardan istehsalat müəssisələrinə qədər geniş spektrli bizneslərin avtomatlaşdırılması və POS CLASS, POS TÜRK avadanlıqlarının rəsmi nümayəndəliyi ilə bazarda lider mövqedədir.'
    WHERE Position LIKE N'%direktor%' OR Position LIKE N'%director%';
    
    PRINT N'Existing director updated with description';
END

-- Verify the director exists
SELECT 
    Id,
    Name,
    Position,
    Email,
    Phone,
    LinkedIn,
    ImageUrl,
    Description
FROM Employees 
WHERE Position LIKE N'%direktor%' OR Position LIKE N'%director%';
