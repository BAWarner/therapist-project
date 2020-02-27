SELECT p.firstname, p.lastname, p.profile_image, 
p.emailaddress, s.status, s.status_id
FROM patients p
JOIN patient_status s
ON s.patient_id = p.patient_id
WHERE s.therapist_id = $1;