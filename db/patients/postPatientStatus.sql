INSERT INTO patient_status (patient_id, therapist_id, status)
VALUES ($1, $2, 'pending') RETURNING *;