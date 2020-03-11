SELECT s.specialty_id, s.name, s.abbreviation 
FROM specialties s
JOIN therapist_specialties ts
ON s.specialty_id = ts.specialty_id
WHERE ts.therapist_id = $1;