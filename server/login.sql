
create table users (
  id serial primary key,
  username varchar(100) unique not null,
  email varchar(100) unique not null,
  password varchar(255) not null
);

insert into users (username,email,password) values ('admin','admin@123','admin123');
