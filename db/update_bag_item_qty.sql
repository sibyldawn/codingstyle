update bag
set qty = $1
where user_id = $2 and product_id = $3
returning *;