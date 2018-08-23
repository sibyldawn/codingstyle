update products
set price = $1
where name= $2
returning *;