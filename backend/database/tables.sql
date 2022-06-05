CREATE DATABASE leave_app;

/*Users*/

CREATE TABLE users(
    u_id SERIAL,
    u_name TEXT NOT NULL,
    u_email TEXT NOT NULL,
    u_mobile numeric  NOT NULL,
    u_country_code TEXT NOT NULL,
    u_address JSON,
    u_password TEXT NOT NULL,
    u_type INTEGER NOT NULL, -- 1 admin, 2 emp
    status CHARACTER VARYING (1) NOT NULL, -- E - Effective, D - Disabled or not in use
    add_by_id TEXT NOT NULL,
    add_date timestamp WITHOUT TIME ZONE NOT NULL,
    modified_by_id TEXT NOT NULL,
    modified_date timestamp WITHOUT TIME ZONE NOT NULL
    user_code text;
);

CREATE UNIQUE INDEX i_users ON users (u_id, u_email, u_mobile);
CREATE UNIQUE INDEX i_users2 ON users (u_email, u_mobile);

/*
MASTERS
*/

CREATE TABLE user_type(
    id SERIAL,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    status CHARACTER VARYING (1) NOT NULL, -- E - Effective, D - Disabled or not in use
    add_by_id TEXT NOT NULL,
    add_date timestamp WITHOUT TIME ZONE NOT NULL,
    modified_by_id TEXT NOT NULL,
    modified_date timestamp WITHOUT TIME ZONE NOT NULL
)

CREATE UNIQUE INDEX i_user_type ON user_type (code, name);


CREATE TABLE leave_types(
    id SERIAL,
     code TEXT NOT NULL,
    name TEXT NOT NULL,
   status CHARACTER VARYING (1) NOT NULL, -- E - Effective, D - Disabled or not in use
    add_by_id TEXT NOT NULL,
    add_date timestamp WITHOUT TIME ZONE NOT NULL,
    modified_by_id TEXT NOT NULL,
    modified_date timestamp WITHOUT TIME ZONE NOT NULL
)

CREATE UNIQUE INDEX i_leave_types ON user_type (code, name);


/*
transaction
*/

CREATE TABLE leave_trans(

    id SERIAL,
    leave_type_id INTEGER NOT NULL,
    applied_u_id INTEGER NOT NULL,
    applied_date DATE NOT NULL,
    approved_cancelled_u_id INTEGER ,
    leave_status CHARACTER VARYING(1) NOT NULL, -- C Cancelled, A Approved, P Pending, R rejected
    cancelled_date DATE WITHOUT TIME ZONE,
    approved_date DATE WITHOUT TIME ZONE

)

CREATE  INDEX i_leave_trans ON leave_trans(id,applied_u_id,leave_type_id);