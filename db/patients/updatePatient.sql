UPDATE patients
SET firstname = $2,
    lastname = $3,
    emailaddress = $4,
    profile_image = $5
WHERE patient_id = $1