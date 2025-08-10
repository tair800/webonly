-- Fix the first employee to be the director
UPDATE Employees 
SET Position = N'Direktor',
    Name = N'Əli Məmmədov',
    Email = N'ali.mammadov@webonly.az',
    LinkedIn = N'linkedin.com/in/ali-mammadov'
WHERE Id = 1;

-- Verify the director now exists
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
