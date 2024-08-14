\c url_shortener
DELETE FROM urls WHERE "createdAt" < now()-'48 hour'::interval;