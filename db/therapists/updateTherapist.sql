UPDATE therapists
SET firstname = $2,
    lastname = $3,
    emailaddress = $4,
    profile_image = $5
WHERE therapist_id = $1