INSERT INTO resources
( name, document, description, therapist_id )
VALUES
( $2, $3, $4, $1 )
RETURNING *;