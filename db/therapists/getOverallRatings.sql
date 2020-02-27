SELECT AVG(r.rating)
FROM reviews r
JOIN therapists t
ON t.therapist_id = r.therapist_id
WHERE r.therapist_id = $1;