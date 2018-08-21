select b.id,b.date,b.total, u.first_name, u.last_name,s.address, s.city, s.state, s.zipcode from bag b
join users u on u.id= b.user_id
join shipTo s on s.user_id=u.id
order by b.id DESC;