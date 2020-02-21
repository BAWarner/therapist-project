CREATE TABLE therapists(
    therapist_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    profile_image TEXT,
    education TEXT,
    length_of_sessions INT,
    about TEXT,
    insurance BOOLEAN
)

CREATE TABLE resources(
    resource_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    document TEXT,
    description TEXT,
    therapist_id INT FOREIGN KEY REFERENCES therapists(therapist_id)
)

CREATE TABLE patients(
    patient_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    profile_image TEXT,
    therapist_id INT FOREIGN KEY REFERENCES therapists(therapist_id),
    resource_id INT FOREIGN KEY REFERENCES resources(resource_id)
)

CREATE TABLE reviews(
    review_id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    rating INT NOT NULL,
    patient_id INT FOREIGN KEY REFERENCES patients(patient_id),
    therapist_id INT FOREIGN KEY REFERENCES therapists(therapist_id)
)

CREATE TABLE specialties(
    specialty_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
)

CREATE TABLE amenities(
    amenity_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
)

CREATE TABLE methods(
    method_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
)

CREATE TABLE therapist_specialties(
    combined_specialty_id SERIAL PRIMARY KEY,
    therapist_id INT FOREIGN KEY REFERENCES therapists(therapist_id),
    specialty_id INT FOREIGN KEY REFERENCES specialties(specialty_id)
)

CREATE TABLE therapist_amenities(
    combined_amenity_id SERIAL PRIMARY KEY,
    therapist_id INT FOREIGN KEY REFERENCES therapists(therapist_id),
    amenity_id INT FOREIGN KEY REFERENCES amenities(amenity_id)
)

CREATE TABLE therapist_methods(
    combined_method_id SERIAL PRIMARY KEY,
    therapist_id INT FOREIGN KEY REFERENCES therapists(therapist_id),
    method_id INT FOREIGN KEY REFERENCES methods(method_id)
)