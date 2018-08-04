select b.id,b.date,b.status, u.first_name, u.last_name, p.name, p.price, p.category, p.size, s.address, s.city, s.state, s.zipcode from bag b
join users u on b.user_id=u.id
join shipTo s on s.user_id=u.id
join products p on b.product_id=p.id
order by b.id DESC;