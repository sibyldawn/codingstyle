update products
set price = $1
where id = $2
returning *;