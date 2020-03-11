UPDATE patient_status
SET status = 'pending',
    therapist_id = $2
WHERE patient_id = $1
RETURNING *;