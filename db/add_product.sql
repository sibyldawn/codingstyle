insert into products
(name,price,size,category,picture)
values
($1,$2,$3,$4,$5)
returning *;