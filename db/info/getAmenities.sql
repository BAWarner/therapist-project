SELECT a.name, a.amenity_id
FROM amenities a
JOIN therapist_amenities ta
ON a.amenity_id = ta.amenity_id
WHERE ta.therapist_id = $1