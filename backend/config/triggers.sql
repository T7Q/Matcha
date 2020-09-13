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