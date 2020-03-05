CREATE TABLE therapists(
    therapist_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    profile_image TEXT,
    education TEXT,
    length_of_sessions INT,
    about TEXT,
    insurance BOOLEAN,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    emailaddress VARCHAR(100)
);

CREATE TABLE resources(
    resource_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    document TEXT,
    description TEXT,
    therapist_id INT REFERENCES therapists(therapist_id)
);

CREATE TABLE patients(
    patient_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    profile_image TEXT,
    therapist_id INT REFERENCES therapists(therapist_id),
    resource_id INT REFERENCES resources(resource_id),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    emailaddress VARCHAR(100)
);

CREATE TABLE reviews(
    review_id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    rating FLOAT NOT NULL,
    patient_id INT REFERENCES patients(patient_id),
    therapist_id INT REFERENCES therapists(therapist_id)
);

CREATE TABLE patient_status(
    status_id SERIAL PRIMARY KEY,
    therapist_id INT REFERENCES therapists(therapist_id),
    patient_id INT REFERENCES patients(patient_id),
    status VARCHAR(10) DEFAULT 'inactive'
);

CREATE TABLE specialties(
    specialty_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    abbreviation VARCHAR(10)
);

CREATE TABLE amenities(
    amenity_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE methods(
    method_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE therapist_specialties(
    combined_specialty_id SERIAL PRIMARY KEY,
    therapist_id INT REFERENCES therapists(therapist_id),
    specialty_id INT REFERENCES specialties(specialty_id)
);

CREATE TABLE therapist_amenities(
    combined_amenity_id SERIAL PRIMARY KEY,
    therapist_id INT REFERENCES therapists(therapist_id),
    amenity_id INT REFERENCES amenities(amenity_id)
);

CREATE TABLE therapist_methods(
    combined_method_id SERIAL PRIMARY KEY,
    therapist_id INT REFERENCES therapists(therapist_id),
    method_id INT REFERENCES methods(method_id)
);

CREATE TABLE appointments(
    appointment_id SERIAL PRIMARY KEY,
    price INT,
    therapist_id INT REFERENCES therapists(therapist_id) NOT NULL,
    patient_id INT REFERENCES patients(patient_id),
    startApt TEXT NOT NULL,
    endApt TEXT NOT NULL,
    title VARCHAR(250)
);