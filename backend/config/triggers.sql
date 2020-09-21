-- Triggers: update fame_rating

CREATE FUNCTION fame_increase_fnc()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	UPDATE users
	SET fame_rating=(
	SELECT CAST (count(to_user_id) as float) / 14 AS rating
	FROM likes
	WHERE to_user_id = NEW.to_user_id
	AND DATE_PART('day', NOW() - date_created) < 14
	)
	WHERE user_id = NEW.to_user_id;
RETURN NEW;
END;
$BODY$;



CREATE TRIGGER increase_fame
    AFTER INSERT
    ON likes
    FOR EACH ROW
    EXECUTE PROCEDURE fame_increase_fnc();



CREATE FUNCTION fame_decrease_fnc()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	UPDATE users
	SET fame_rating=(
	SELECT CAST (count(to_user_id) as float) / 14 AS rating
	FROM likes
	WHERE to_user_id = OLD.to_user_id
	AND DATE_PART('day', CURRENT_DATE - date_created) < 14
	)
	WHERE user_id = OLD.to_user_id;
RETURN OLD;
END;
$BODY$;


CREATE TRIGGER reduce_fame
    AFTER DELETE
    ON likes
    FOR EACH ROW
    EXECUTE PROCEDURE fame_decrease_fnc();


-- Triggers: update age, chinese and western horoscope based on birth date

CREATE FUNCTION public.age_horoscope_calc_fnc()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	UPDATE users
	SET chinese_horo=(
		CASE
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 0 THEN 'Monkey'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 1 THEN 'Rooster'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 2 THEN 'Dog'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 3 THEN 'Pig'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 4 THEN 'Rat'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 5 THEN 'Ox'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 6 THEN 'Tiger'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 7 THEN 'Rabbit'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 8 THEN 'Dragon'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 9 THEN 'Snake'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 10 THEN 'Horse'
            WHEN MOD(CAST (extract(year from birth_date) AS INTEGER), 12) = 11 THEN 'Goat'
        END
	),
	western_horo=
	(
	CASE
	WHEN (cast (extract(month from birth_date) as integer) = 3 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 4 AND cast (extract(day from birth_date) as integer) <= 19) THEN 'Aries'
	WHEN (cast (extract(month from birth_date) as integer) = 4 AND cast (extract(day from birth_date) as integer) >= 20) OR (cast (extract(month from birth_date) as integer) = 5 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Taurus'
	WHEN (cast (extract(month from birth_date) as integer) = 5 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 6 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Gemini'
	WHEN (cast (extract(month from birth_date) as integer) = 6 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 7 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Cancer'
	WHEN (cast (extract(month from birth_date) as integer) = 7 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 8 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Leo'
	WHEN (cast (extract(month from birth_date) as integer) = 8 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 9 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Virgo'
	WHEN (cast (extract(month from birth_date) as integer) = 9 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 10 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Libra'
	WHEN (cast (extract(month from birth_date) as integer) = 10 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 11 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Scorpio'
	WHEN (cast (extract(month from birth_date) as integer) = 11 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 12 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Sagittarius'
	WHEN (cast (extract(month from birth_date) as integer) = 12 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 1 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Capricorn'
	WHEN (cast (extract(month from birth_date) as integer) = 1 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 2 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Aquarius'
	WHEN (cast (extract(month from birth_date) as integer) = 2 AND cast (extract(day from birth_date) as integer) >= 21) OR (cast (extract(month from birth_date) as integer) = 3 AND cast (extract(day from birth_date) as integer) <= 20) THEN 'Pisces'
	END
	),
	age=(EXTRACT(YEAR FROM AGE(now(), birth_date)))
	WHERE user_id = NEW.user_id;
RETURN NEW;
END;
$BODY$;

CREATE TRIGGER age_horscope_update
    AFTER INSERT OR UPDATE OF birth_date
    ON public.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.age_horoscope_calc_fnc();



-- Triggers: create_chat

-- CREATE FUNCTION create_chat()
--     RETURNS trigger
--     LANGUAGE 'plpgsql'
--     COST 100
--     VOLATILE NOT LEAKPROOF
-- AS $BODY$
-- BEGIN
--     BEGIN
--     IF EXISTS (
--         SELECT from_user_id FROM likes
--         WHERE to_user_id = NEW.from_user_id
--         AND from_user_id = NEW.to_user_id
--     )
--     THEN
--         INSERT INTO chats (user_1, user_2)
--         VALUES (NEW.from_user_id, NEW.to_user_id);
--     END IF;
-- RETURN NEW;
-- END;
-- $BODY$;



-- CREATE TRIGGER create_chat
-- AFTER INSERT
-- ON likes FOR EACH ROW
-- EXECUTE PROCEDURE create_chat();

