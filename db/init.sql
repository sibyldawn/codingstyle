drop table if exists users;
drop table if exists products;

create table users(
    id serial primary key,
    auth0_id text unique not null,
    first_name text not null,
    last_name text not null,
    picture text,
    email text not null,
    address text not null,
    city text not null,
    state text not null,
    zipcode integer not null
);

create table products(
    id serial primary key,
    name text not null,
    price decimal not null,
    size text not null,
    category text not null
);

select * from users;
select * from products;