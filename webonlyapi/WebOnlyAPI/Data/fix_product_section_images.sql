-- Fix missing Section Image columns in Products table
-- This script adds the missing columns that should have been added by migration 20250810125234_AddProductSectionImages

-- Check if columns exist before adding them
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'Section1Image')
BEGIN
    ALTER TABLE Products ADD Section1Image NVARCHAR(500) NULL;
    PRINT 'Added Section1Image column';
END
ELSE
BEGIN
    PRINT 'Section1Image column already exists';
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'Section2Image')
BEGIN
    ALTER TABLE Products ADD Section2Image NVARCHAR(500) NULL;
    PRINT 'Added Section2Image column';
END
ELSE
BEGIN
    PRINT 'Section2Image column already exists';
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'Section3Image')
BEGIN
    ALTER TABLE Products ADD Section3Image NVARCHAR(500) NULL;
    PRINT 'Added Section3Image column';
END
ELSE
BEGIN
    PRINT 'Section3Image column already exists';
END

-- Verify the columns were added
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Products' 
AND COLUMN_NAME IN ('Section1Image', 'Section2Image', 'Section3Image')
ORDER BY COLUMN_NAME;
