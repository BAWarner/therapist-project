SELECT s.status, t.firstname, t.lastname, t.therapist_id 
FROM patient_status s
JOIN patients p
ON s.patient_id = p.patient_id
JOIN therapists t
ON s.therapist_id = t.therapist_id
WHERE s.patient_id = $1;