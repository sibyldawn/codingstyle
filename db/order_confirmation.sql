select b.id, b.date, u.first_name, u.last_name, u.email,s.address,s.city,s.state, s.zipcode,b.total from users u
join shipTo s on u.id = s.user_id
join bag b on b.user_id = u.id
where b.id=$2;