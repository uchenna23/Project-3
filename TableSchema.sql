CREATE TABLE Total_Medals(
Rank varchar,
country_code varchar,
Gold_Medal int,
Silver_Medal int,
Bronze_Medal int,
Total int,
Country varchar,
FOREIGN KEY (country_code) REFERENCES Athletes(country_code)
);

CREATE TABLE Athletes(
name varchar,
gender varchar,
country varchar,
country_code varchar,
discipline varchar,
url varchar,
name_length varchar,
PRIMARY KEY (country_code, url)
);

CREATE TABLE Medals(
name varchar,
gender varchar,
medal_type varchar,
country varchar,
country_code varchar,
event varchar,
discipline varchar,
url varchar,
FOREIGN KEY (country_code,url) REFERENCES Athletes(country_code,url)
);



select * from total_medals
select * from medals
select * from athletes
