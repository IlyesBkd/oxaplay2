-- Add discount percentage columns to prices table
ALTER TABLE prices 
ADD COLUMN IF NOT EXISTS carplay_voiture_discount INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS carplay_moto_discount INTEGER DEFAULT 50;

-- Update existing row to have default discount values
UPDATE prices 
SET carplay_voiture_discount = 50, carplay_moto_discount = 50 
WHERE id = 'singleton' AND carplay_voiture_discount IS NULL;
