UPDATE patient_status
SET status = $2
WHERE status_id = $1;