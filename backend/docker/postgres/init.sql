create table if not exists articles (
   id            serial primary key,
   title         text,
   url           text unique,
   likes_count   int default 0,
   thumbnail_url text,
   created_at    timestamp default now()
);

create table if not exists feeds (
   id            serial primary key,
   name          text,
   platform_type text
);

create table if not exists feed_articles (
   feed_id    int,
   article_id int,
   primary key ( feed_id,
                 article_id )
);

create table if not exists trend_articles (
   id             serial primary key,
   article_id     int,
   likes_snapshot int,
   collected_at   timestamp default now()
);