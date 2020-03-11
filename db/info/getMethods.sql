SELECT m.name, m.method_id
FROM methods m
JOIN therapist_methods tm
ON m.method_id = tm.method_id
WHERE tm.therapist_id = $1;