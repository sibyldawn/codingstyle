insert into bag
(date,cart,total,user_id)
values
(now(),$1,$2,$3)
returning *;