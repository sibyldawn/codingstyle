drop table if exists users;
drop table if exists products;

create table users(
    id serial primary key,
    auth0_id text unique not null,
    first_name text not null,
    last_name text not null,
    picture text,
    email text not null,
);

create table shipTo(
    id serial primary key,
    user_id int references users(id),
    address text not null,
    city text not null,
    state text not null,
    zipcode integer not null);

create table products(
    id serial primary key,
    name text not null,
    price decimal not null,
    size text not null,
    category text not null,
    picture text not null,
);

create table bag(
    id serial primary key,
    date date not null,
    product_id int references products(id),
    qty int not null,
    user_id int references users(id)
);

create table isAdmin(
 id serial primary key,
 username text unique not null,
 password text not null
);



select * from users;
select * from products;
select * from bag;
select * from isAdmin;
select * from shipTo;

/*DUMMY DATA*/
insert into users
(auth0_id,first_name,last_name,picture,email,address,city,state,zipcode)
values
('10156588488997021','Luis','Co','https://cdn.onlinewebfonts.com/svg/img_191958.png','luisg@embraer.com.br','Av. Brigadeiro Faria Lima, 2170','São José dos Campos','SP','12345'),
('10156588488997022','Leonie','Kohler','https://cdn.onlinewebfonts.com/svg/img_191958.png','leonekohler@surfeu.de','Theodor-Heuss-Straße 34','Stuttgart','AZ','78919'),
('10156588488997023','François','Tremblay','https://cdn.onlinewebfonts.com/svg/img_191958.png','ftremblay@gmail.com','1498 rue Bélanger','Montréal','QC','00391');

insert into shipTo
(user_id,address,city,state,zipcode)
values
('1','Av. Brigadeiro Faria Lima, 2170','São José dos Campos','SP','12345'),
('2','Theodor-Heuss-Straße 34','Stuttgart','AZ','78919'),
('3','1498 rue Bélanger','Montréal','QC','00391');



insert into bag
(date,product_id,qty,user_id)
values
('2018-07-25','5','2','1'),
('2018-07-25','13','3','1'),
('2018-07-24','11','4','2'),
('2018-07-20','1','10','3'),
('2018-07-25','11','10','3'),
('2018-07-20','4','10','3');


select * from products;

insert into products
(name,price,size,category,picture,)
values
('Let Me Fork Your Repository','29.99','M','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194995/Products/drhcy5met0v6xw3pfckd.jpg'),
('Let Me Fork Your Repository','29.99','L','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194995/Products/drhcy5met0v6xw3pfckd.jpg'),
('Let Me Fork Your Repository','29.99','XL','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194995/Products/drhcy5met0v6xw3pfckd.jpg'),
('EatSleepCode','24.99','M','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195080/Products/idgit8tilakwlo48112h.jpg'),
('EatSleepCode','24.99','L','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195080/Products/idgit8tilakwlo48112h.jpg'),
('EatSleepCode','24.99','XL','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195080/Products/idgit8tilakwlo48112h.jpg'),
('CODE','25.99','M','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195194/Products/veup0wmoh0k2nhfg8mxo.jpg'),
('CODE','25.99','L','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195194/Products/veup0wmoh0k2nhfg8mxo.jpg'),
('CODE','25.99','XL','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195194/Products/veup0wmoh0k2nhfg8mxo.jpg'),
('Id Rather Be Coding','25.99','M','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194843/Products/xluwskbgyvipvvqjfi63.jpg'),
('Id Rather Be Coding','25.99','L','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194843/Products/xluwskbgyvipvvqjfi63.jpg'),
('Id Rather Be Coding','25.99','XL','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194843/Products/xluwskbgyvipvvqjfi63.jpg'),
('Its Not a Bug','25.99','M','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194879/Products/l9x4a5zin19atnjsv53d.jpg'),
('Its Not a Bug','25.99','L','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194879/Products/l9x4a5zin19atnjsv53d.jpg'),
('Its Not a Bug','25.99','XL','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194879/Products/l9x4a5zin19atnjsv53d.jpg')
('EatSleepCode','24.99','M','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194670/Products/lmoxafif6cztsdp13gb4.jpg'),
('EatSleepCode','24.99','L','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194670/Products/lmoxafif6cztsdp13gb4.jpg'),
('EatSleepCode','24.99','XL','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194670/Products/lmoxafif6cztsdp13gb4.jpg'),
('Id Rather Be Coding','25.99','M','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194379/Products/g9pzkgdbiujkfb6xkyew.jpg'),
('Id Rather Be Coding','25.99','L','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194379/Products/g9pzkgdbiujkfb6xkyew.jpg'),
('Id Rather Be Coding','25.99','XL','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194379/Products/g9pzkgdbiujkfb6xkyew.jpg'),
('Its Not a Bug','25.99','M','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194797/Products/eeuxgp3xf10rfunyhwfx.jpg'),
('Its Not a Bug','25.99','L','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194797/Products/eeuxgp3xf10rfunyhwfx.jpg'),
('Its Not a Bug','25.99','XL','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194797/Products/eeuxgp3xf10rfunyhwfx.jpg'),
('In Case of Fire','25.99','M','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194710/Products/hqjsdkbn0ocbtoe6ruvu.jpg'),
('In Case of Fire','25.99','L','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194710/Products/hqjsdkbn0ocbtoe6ruvu.jpg'),
('In Case of Fire','25.99','XL','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194710/Products/hqjsdkbn0ocbtoe6ruvu.jpg'),
('In Case of Fire','25.99','M','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194919/Products/x8gttworqd4mhijzspty.jpg'),
('In Case of Fire','25.99','L','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194919/Products/x8gttworqd4mhijzspty.jpg'),
('In Case of Fire','25.99','XL','Women','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194919/Products/x8gttworqd4mhijzspty.jpg'),
('CODE','25.99','M','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194619/Products/zvdjy2xd0olakqd5130f.jpg'),
('CODE','25.99','L','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194619/Products/zvdjy2xd0olakqd5130f.jpg'),
('CODE','25.99','XL','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194619/Products/zvdjy2xd0olakqd5130f.jpg'),
('Let Me Fork Your Repository','29.50','M','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194761/Products/j1696skahk640zdduj1t.jpg'),
('Let Me Fork Your Repository','29.50','L','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194761/Products/j1696skahk640zdduj1t.jpg'),
('Let Me Fork Your Repository','29.50','XL','Men','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194761/Products/j1696skahk640zdduj1t.jpg'),


