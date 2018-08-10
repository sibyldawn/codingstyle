select u.id, u.first_name, u.last_name, u.email,s.address,s.city,s.state, s.zipcode from users u
join shipTo s on u.id = s.user_id
where u.id = $1;