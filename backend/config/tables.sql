DO $$ BEGIN
    CREATE TYPE gender AS ENUM ('man', 'woman');
    CREATE TYPE sex_preference AS ENUM ('hetero', 'bi', 'homo');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "notifications"
(
 "notification_id" serial NOT NULL ,
 "likes"           int NOT NULL ,
 "messages"        int NOT NULL ,
 "visits"          int NOT NULL ,
 CONSTRAINT "PK_notifications" PRIMARY KEY ( "notification_id" )
);

CREATE TABLE IF NOT EXISTS "users"
(
 "user_id"                  bigserial NOT NULL,
 "first_name"               varchar(32) NOT NULL ,
 "last_name"                varchar(32) NOT NULL ,
 "username"                 varchar(32) NULL ,
 "email"                    varchar(64) NOT NULL ,
 "password"                 varchar(1000) NULL ,
 "token"                    varchar(255) NULL DEFAULT 0 ,
 "activated"                int NOT NULL DEFAULT 0 ,
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
 "last_seen"                timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "created_at"               timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "age"                      int NOT NULL ,
 "sex_preference"           sex_preference NOT NULL ,
 "western_horo"             varchar(45) NOT NULL ,
 "chinese_horo"             varchar(45) NOT NULL ,
 "profile_pic_path"         varchar(255) NOT NULL ,
 "real_time_notification"   boolean NOT NULL ,
 "notification_id"          integer NOT NULL ,
 CONSTRAINT "PK_users" PRIMARY KEY ( "user_id" ),
 CONSTRAINT "FK_32" FOREIGN KEY ( "notification_id" ) REFERENCES "notifications" ( "notification_id" )
);

CREATE INDEX IF NOT EXISTS "fkIdx_32" ON "users"
(
 "notification_id"
);

CREATE TABLE IF NOT EXISTS "western_horo_compatibility"
(
 "sign_1"               varchar(50) NOT NULL ,
 "compatibility_value" int NOT NULL ,
 "sign_2"               varchar(50) NOT NULL ,
 CONSTRAINT "PK_western_horo_compatibility" PRIMARY KEY ( "sign_1", "sign_2" )
);

CREATE TABLE IF NOT EXISTS "views"
(
 "view_id"      bigserial NOT NULL,
 "date_created" timestamp DEFAULT CURRENT_TIMESTAMP ,
 "from_user_id" bigint NOT NULL,
 "to_user_id"   bigint NOT NULL,
 CONSTRAINT "PK_views" PRIMARY KEY ( "view_id" ),
 CONSTRAINT "FK_44" FOREIGN KEY ( "from_user_id" ) REFERENCES "users" ( "user_id" ),
 CONSTRAINT "FK_47" FOREIGN KEY ( "to_user_id" ) REFERENCES "users" ( "user_id" )
);

CREATE INDEX IF NOT EXISTS "fkIdx_44" ON "views"
(
 "from_user_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_47" ON "views"
(
 "to_user_id"
);

CREATE TABLE IF NOT EXISTS "tags"
(
 "tag_id"   bigserial NOT NULL,
 "tag_name" varchar(32) NOT NULL ,
 CONSTRAINT "PK_tags" PRIMARY KEY ( "tag_id" )
);

CREATE TABLE IF NOT EXISTS "user_tags"
(
 "id"      bigserial NOT NULL,
 "user_id" bigint NULL ,
 "tag_id"  bigint NOT NULL ,
 CONSTRAINT "PK_user_tags" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_57" FOREIGN KEY ( "tag_id" ) REFERENCES "tags" ( "tag_id" ),
 CONSTRAINT "FK_60" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "user_id" )
);

CREATE INDEX IF NOT EXISTS "fkIdx_57" ON "user_tags"
(
 "tag_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_60" ON "user_tags"
(
 "user_id"
);

CREATE TABLE IF NOT EXISTS "report_users"
(
 "report_id"        bigserial NOT NULL,
 "user_id"          bigint NULL ,
 "user_id_reported" bigint NULL ,
 "created_at"       timestamp DEFAULT CURRENT_TIMESTAMP ,
 CONSTRAINT "PK_report_users" PRIMARY KEY ( "report_id" ),
 CONSTRAINT "FK_62" FOREIGN KEY ( "user_id" ) REFERENCES "users" ("user_id"),
 CONSTRAINT "FK_63" FOREIGN KEY ( "user_id_reported" ) REFERENCES "users" ("user_id")
);

CREATE INDEX IF NOT EXISTS "fkIdx_62" ON "report_users"
(
 "user_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_63" ON "report_users"
(
 "user_id_reported"
);

CREATE TABLE IF NOT EXISTS "block_users"
(
 "block_id"        bigserial NOT NULL,
 "user_id"         bigint NULL ,
 "user_id_blocked" bigint NULL ,
 "created_at"      timestamp DEFAULT CURRENT_TIMESTAMP ,
 CONSTRAINT "PK_block_users" PRIMARY KEY ( "block_id" ),
 CONSTRAINT "FK_64" FOREIGN KEY ( "user_id" ) REFERENCES "users" ("user_id"),
 CONSTRAINT "FK_65" FOREIGN KEY ( "user_id_blocked" ) REFERENCES "users" ("user_id")
);

CREATE INDEX IF NOT EXISTS "fkIdx_64" ON "block_users"
(
 "user_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_65" ON "block_users"
(
 "user_id_blocked"
);

CREATE TABLE IF NOT EXISTS "chats"
(
 "chat_id"    bigserial NOT NULL,
 "user_id"    bigint NULL ,
 "started_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "closed_at"  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 CONSTRAINT "PK_chats" PRIMARY KEY ( "chat_id" ),
 CONSTRAINT "FK_66" FOREIGN KEY ( "user_id" ) REFERENCES "users" ("user_id")
);

CREATE INDEX IF NOT EXISTS "fkIdx_66" ON "chats"
(
 "user_id"
);

CREATE TABLE IF NOT EXISTS "chinese_horo_compatibility"
(
 "sign_1"               varchar(50) NOT NULL ,
 "compatibility_value"  int NOT NULL ,
 "sign_2"               varchar(50) NOT NULL ,
 CONSTRAINT "PK_chinese_horo_compatibility" PRIMARY KEY ( "sign_1", "sign_2" )
);

CREATE TABLE IF NOT EXISTS "images"
(
 "image_id"     bigserial NOT NULL,
 "user_id"      bigint NULL ,
 "image_path"   varchar(255) NULL ,
 "date_created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 CONSTRAINT "PK_images" PRIMARY KEY ( "image_id" ),
 CONSTRAINT "FK_23" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "user_id" )
);

CREATE INDEX IF NOT EXISTS "fkIdx_23" ON "images"
(
 "user_id"
);

CREATE TABLE IF NOT EXISTS "likes"
(
 "like_id"      bigserial NOT NULL,
 "date_created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "from_user_id" bigint NOT NULL ,
 "to_user_id"   bigint NOT NULL ,
 CONSTRAINT "PK_likes" PRIMARY KEY ( "like_id" ),
 CONSTRAINT "FK_70" FOREIGN KEY ( "from_user_id" ) REFERENCES "users" ( "user_id" ),
 CONSTRAINT "FK_71" FOREIGN KEY ( "to_user_id" ) REFERENCES "users" ( "user_id" )
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
 "message_id" bigserial NOT NULL,
 "message"    text NULL ,
 "time_sent"  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "chat_id"    bigint NOT NULL ,
 "sender_id"  bigint NOT NULL ,
 CONSTRAINT "PK_messages" PRIMARY KEY ( "message_id" ),
 CONSTRAINT "FK_72" FOREIGN KEY ( "sender_id" ) REFERENCES "users" ( "user_id" ),
 CONSTRAINT "FK_73" FOREIGN KEY ( "chat_id" ) REFERENCES "chats" ("chat_id")
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
 "participant_id" bigserial NOT NULL,
 "partner_id"     bigint NULL ,
 "time_joined"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "time_left"      timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "chat_id"        bigint NOT NULL ,
 CONSTRAINT "PK_participants" PRIMARY KEY ( "participant_id" ),
 CONSTRAINT "FK_74" FOREIGN KEY ( "partner_id" ) REFERENCES "users" ( "user_id" ),
 CONSTRAINT "FK_75" FOREIGN KEY ( "chat_id" ) REFERENCES "chats" ("chat_id")
);

CREATE INDEX IF NOT EXISTS "fkIdx_74" ON "participants"
(
 "partner_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_75" ON "participants"
(
 "chat_id"
);
