select * from users u
join shipTo s on u.id = s.user_id
where u.id=$1;