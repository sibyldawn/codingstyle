insert into bag
(date,product_id,qty,user_id)
values
(now(),$1,$2,$3)
returning *;