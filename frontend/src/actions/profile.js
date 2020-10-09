import axios from "axios";
import {
    CREATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_CONNECTED,
    UPDATE_ERROR,
} from "./types";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

// Get user profile
export const getProfile = (type, userId) => async (dispatch) => {
    // clear profile state to prevent blinking of old info on screen
    // dispatch({ type: CLEAR_PROFILE });

    // send request to corresponding router depending on wheather profile is My or Other user
    try {
        const res =
            type === "myProfile"
                ? await axios.get("/profile/me")
                : await axios.get(`/profile/${userId}`);

        // send data to reducer
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: err },
        });
    }
};

const convertImages = (images) => {
    const data = {
        key: "photo",
        value: Object.values(images)
            .filter((value) => !Array.isArray(value) && value !== "")
            .map((value) => ({ type: "profile", data: value })),
    };
    return data;
};

// Create or update profile
export const createProfile = (formData, images, history) => async (
    dispatch
) => {
    try {
        // console.log('create profile');
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const imagesToSubmit = convertImages(images);
        // console.log(imagesToSubmit);
        const res = await axios.post("profile/create", formData, config);
        // console.log('res', res);
        if (res.data.error) {
            const errors = res.data.error;
            errors.forEach((error) =>
                dispatch(setAlert(error.error, "danger"))
            );
            console.log("error in createprofile", errors);
            dispatch({
                type: PROFILE_ERROR,
                payload: res.data.error,
            });
        } else {
            dispatch({
                type: CREATE_PROFILE,
                payload: res.data,
            });
            const imagesRes = await axios.post(
                "/profile/uploadphoto",
                imagesToSubmit,
                config
            );
            // console.log(imagesRes);
            if (imagesRes.data.error) {
                console.log(imagesRes.data.error);
            } else {
                // console.log('success', imagesRes);
            }
            dispatch(loadUser());
            history.push("/Profile");
        }
    } catch (err) {
        console.log(err);
    }
};

// Add like, block user, report user
export const addInteraction = (type, toUserId, match) => async (dispatch) => {
    // console.log("ACTION add interaction");
    // console.log("type", type, "toUserId", toUserId);

    // prepare data to send to the server
    const data = { key: "likes", to_user_id: toUserId };
    try {
        // add interaction to the database
        await axios.post("/profile/addinteraction", data);

        // update relevant state
        match.forEach((element) => {
            if (element.user_id === toUserId) {
                element["connected"] = 1;
            }
        });

        dispatch({
            type: UPDATE_CONNECTED,
        });
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { status: err },
        });
    }
};
