SELECT AVG(r.rating)
FROM reviews r
JOIN therapists t
ON therapist_id = therapist_id
WHERE therapist_id = $1;