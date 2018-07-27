insert into shipTo
(user_id,address,city,state,zipcode)
values
($1,$2,$3,$4,$5)
returning *;