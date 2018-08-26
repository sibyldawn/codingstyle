select b.id,b.date, u.first_name, u.last_name, u.first_name, u.last_name,s.address, s.city, s.state, s.zipcode, b.cart, b.total from bag b
join users u on b.user_id=u.id
join shipTo s on s.user_id=u.id
where b.user_id=$1
order by date DESC;