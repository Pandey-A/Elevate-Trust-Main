-- Fix broken Redaction Agent YouTube video (404 thumbnail)
UPDATE demos
SET video_id = 'k_sDkUqKn3k',
    youtube_url = 'https://www.youtube.com/watch?v=k_sDkUqKn3k',
    updated_at = NOW()
WHERE id = 'demo-redaction'
   OR video_id = '-PZ-ryisPms'
   OR youtube_url LIKE '%-PZ-ryisPms%';
