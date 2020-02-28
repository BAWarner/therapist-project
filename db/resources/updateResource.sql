UPDATE resources
SET
name = $2,
document = $3,
description = $4,
therapist_id = $5
WHERE resource_id = $1

RETURNING *;