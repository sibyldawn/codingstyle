select b.id,b.date u.first_name, u.last_name, p.id, p.name, p.price, p.category, p.size  from bag b
join users u on b.user_id=u.id
join products p on b.product_id=p.id
where b.user_id=$1;