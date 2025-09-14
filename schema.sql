-- Modifying the songs table to add primary_language and secondary_languages columns for Cloudflare D1 (SQLite)
ALTER TABLE songs ADD COLUMN primary_language VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE songs ADD COLUMN secondary_languages VARCHAR(255);