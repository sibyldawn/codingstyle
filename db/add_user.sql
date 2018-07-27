insert into users
(auth0_id,first_name,last_name,picture,email)
values
($1,$2,$3,$4,$5)
returning *;