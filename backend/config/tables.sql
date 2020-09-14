DO $$ BEGIN
    CREATE TYPE gender AS ENUM ('man', 'woman');
    CREATE TYPE sex_preference AS ENUM ('man', 'woman', 'both');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "notifications"
(
 "notification_id" serial NOT NULL PRIMARY KEY,
 "likes"           int NOT NULL DEFAULT 0 ,
 "messages"        int NOT NULL DEFAULT 0 ,
 "visits"          int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "users"
(
 "user_id"                  bigserial PRIMARY KEY NOT NULL,
 "first_name"               varchar(32) NULL ,
 "last_name"                varchar(32) NULL ,
 "username"                 varchar(32) UNIQUE NULL ,
 "email"                    varchar(64) UNIQUE NOT NULL ,
 "password"                 varchar(1000) NOT NULL ,
 "token"                    varchar(255) NULL ,
 "status"                   int NOT NULL DEFAULT 0 ,
 "online"                   int NOT NULL DEFAULT 0 ,
 "birth_date"               date NULL ,
 "gender"                   gender NULL ,
 "latitude"                 float NULL ,
 "longitude"                float NULL ,
 "bio"                      text NULL ,
 "fame_rating"              decimal(3,2) NULL ,
 "ip_address"               varchar(15) NULL ,
 "geo_localisation_allowed" boolean NULL DEFAULT FALSE ,
 "google_id"                varchar(255) NULL ,
 "fb_id"                    varchar(255) NULL ,
 "email_notification"       boolean NOT NULL DEFAULT TRUE ,
 "last_seen"                timestamp NULL ,
 "created_at"               timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "age"                      int NULL ,
 "sex_preference"           sex_preference NULL ,
 "western_horo"             varchar(45) NULL ,
 "chinese_horo"             varchar(45) NULL ,
 "profile_pic_path"         varchar(255) NULL ,
 "real_time_notification"   boolean NOT NULL DEFAULT TRUE,
 "notification_id"          integer UNIQUE NULL REFERENCES "notifications" ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "western_horo_compatibility"
(
 "sign_1"               varchar(50) NOT NULL ,
 "sign_2"               varchar(50) NOT NULL ,
 "compatibility_value" int NOT NULL ,
 PRIMARY KEY ( "sign_1", "sign_2" )
);

CREATE TABLE IF NOT EXISTS "views"
(
 "view_id"      bigserial NOT NULL PRIMARY KEY,
 "date_created" timestamp DEFAULT CURRENT_TIMESTAMP ,
 "from_user_id" bigint NOT NULL REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 "to_user_id"   bigint NOT NULL REFERENCES "users" ( "user_id" ) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "tags"
(
 "tag_id"   bigserial NOT NULL PRIMARY KEY,
 "tag_name" varchar(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_tags"
(
 "id"      bigserial NOT NULL PRIMARY KEY,
 "user_id" bigint NOT NULL REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 "tag_id"  bigint NOT NULL REFERENCES "tags" ( "tag_id" ) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "report_users"
(
 "report_id"        bigserial NOT NULL PRIMARY KEY,
 "user_id"          bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "user_id_reported" bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "created_at"       timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "block_users"
(
 "block_id"        bigserial NOT NULL PRIMARY KEY,
 "user_id"         bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "user_id_blocked" bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "created_at"      timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "chats"
(
 "chat_id"    bigserial NOT NULL PRIMARY KEY,
 "user_id"    bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "started_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "closed_at"  timestamp NULL
);

CREATE TABLE IF NOT EXISTS "chinese_horo_compatibility"
(
 "sign_1"               varchar(50) NOT NULL,
 "sign_2"               varchar(50) NOT NULL,
 "compatibility_value"  int NOT NULL,
 PRIMARY KEY ( "sign_1", "sign_2" )
);

CREATE TABLE IF NOT EXISTS "images"
(
 "image_id"     bigserial NOT NULL PRIMARY KEY ,
 "user_id"      bigint NULL  REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 "image_path"   varchar(255) NULL ,
 "date_created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "likes"
(
 "like_id"      bigserial NOT NULL PRIMARY KEY ,
 "date_created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "from_user_id" bigint NOT NULL ,
 "to_user_id"   bigint NOT NULL ,
 CONSTRAINT "FK_70" FOREIGN KEY ( "from_user_id" ) REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 CONSTRAINT "FK_71" FOREIGN KEY ( "to_user_id" ) REFERENCES "users" ( "user_id" ) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "fkIdx_70" ON "likes"
(
 "from_user_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_71" ON "likes"
(
 "to_user_id"
);

CREATE TABLE IF NOT EXISTS "messages"
(
 "message_id" bigserial NOT NULL PRIMARY KEY,
 "message"    text NULL ,
 "time_sent"  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "chat_id"    bigint NOT NULL ,
 "sender_id"  bigint NOT NULL ,
 CONSTRAINT "FK_72" FOREIGN KEY ( "sender_id" ) REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 CONSTRAINT "FK_73" FOREIGN KEY ( "chat_id" ) REFERENCES "chats" ("chat_id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "fkIdx_72" ON "messages"
(
 "sender_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_73" ON "messages"
(
 "chat_id"
);

CREATE TABLE IF NOT EXISTS "participants"
(
 "participant_id" bigserial NOT NULL PRIMARY KEY ,
 "partner_id"     bigint NULL ,
 "time_joined"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "time_left"      timestamp NULL ,
 "chat_id"        bigint NOT NULL ,
 CONSTRAINT "FK_74" FOREIGN KEY ( "partner_id" ) REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 CONSTRAINT "FK_75" FOREIGN KEY ( "chat_id" ) REFERENCES "chats" ("chat_id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "fkIdx_74" ON "participants"
(
 "partner_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_75" ON "participants"
(
 "chat_id"
);
