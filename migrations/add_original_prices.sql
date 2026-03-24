-- Migration: Add original price fields to prices table
-- This migration adds fields for storing the original (strikethrough) prices
-- alongside the actual selling prices and discount percentages

-- Add new columns for original prices
ALTER TABLE prices 
ADD COLUMN IF NOT EXISTS carplay_voiture_original_eur INTEGER DEFAULT 29999,
ADD COLUMN IF NOT EXISTS carplay_voiture_original_usd INTEGER DEFAULT 33999,
ADD COLUMN IF NOT EXISTS carplay_moto_original_eur INTEGER DEFAULT 25999,
ADD COLUMN IF NOT EXISTS carplay_moto_original_usd INTEGER DEFAULT 29999;

-- Update existing row with default original prices
-- These represent the "before discount" prices that will be shown as strikethrough
UPDATE prices 
SET 
  carplay_voiture_original_eur = 29999,  -- 299,99€
  carplay_voiture_original_usd = 33999,  -- 339,99$
  carplay_moto_original_eur = 25999,     -- 259,99€
  carplay_moto_original_usd = 29999      -- 299,99$
WHERE id = 'singleton';

-- Verify the migration
SELECT 
  carplay_voiture_eur as voiture_actual_eur,
  carplay_voiture_original_eur as voiture_original_eur,
  carplay_voiture_discount as voiture_discount,
  carplay_moto_eur as moto_actual_eur,
  carplay_moto_original_eur as moto_original_eur,
  carplay_moto_discount as moto_discount
FROM prices 
WHERE id = 'singleton';
