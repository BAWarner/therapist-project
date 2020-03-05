SELECT * FROM appointments
WHERE therapist_id = $1 AND patient_id = $2;