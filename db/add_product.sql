insert into products
(name,price,size,category,picture)
values
(${name},${price},${size},${category},${picture})
returning *;