-- Update equipment image URL to use the correct uploads path
UPDATE Equipment 
SET ImageUrl = '/uploads/equipment/equipment1.png' 
WHERE ImageUrl = '/assets/equipment1.png';
