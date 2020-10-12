import axios from "axios";
import {
    CREATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_LIKES,
    UPDATE_ERROR,
    SET_SNACKBAR,
    LOGOUT,
    UPDATE_BlOCKED,
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
                : await axios.get(`/profile/user/${userId}`);

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
            return errors;
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

// Add like, update connection level
export const addLike = (location, toUserId, match, profile) => async (
    dispatch
) => {
    try {
        await axios.post(`/profile/addinteraction/likes/${toUserId}`, {});
        const result = await axios.post(`/profile/connected/${toUserId}`, {});
        if (location === "userCard") {
            match.forEach((element) => {
                if (element.user_id === toUserId) {
                    element["connected"] = result.data.msg;
                }
            });
        } else if (location === "profile") {
            profile.connected = result.data.msg;
        }
        dispatch({
            type: UPDATE_LIKES,
        });
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { status: err },
        });
    }
};

// Remove like, update connection level
export const removeLike = (location, toUserId, match, profile) => async (
    dispatch
) => {
    try {
        await axios.post(`/profile/removeinteraction/likes/${toUserId}`, {});
        const result = await axios.post(`/profile/connected/${toUserId}`, {});
        if (location === "userCard") {
            match.forEach((element) => {
                if (element.user_id === toUserId) {
                    element["connected"] = result.data.msg;
                }
            });
        } else if (location === "profile") {
            profile.connected = result.data.msg;
        }
        dispatch({
            type: UPDATE_LIKES,
        });
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { status: err },
        });
    }
};

// Add like, update connection level
export const addInteraction = (type, toUserId) => async (dispatch) => {
    try {
        const result = await axios.post(
            `/profile/addinteraction/${type}/${toUserId}`,
            {}
        );
        if (type === "blocked") {
            dispatch({
                type: UPDATE_BlOCKED,
                payload: "1",
            });
        } else {
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    snackbarOpen: true,
                    snackbarType: "success",
                    snackbarMessage: result.data.msg,
                },
            });
        }
    } catch (err) {
        dispatch({
            type: SET_SNACKBAR,
            payload: {
                snackbarOpen: true,
                snackbarType: "error",
                snackbarMessage:
                    "Something went wrong saving your preference. Try again.",
            },
        });
    }
};
// Add like, update connection level
export const unblockUser = (location, unblockList) => async (dispatch) => {
    try {
        for (const e of unblockList) {
            const res = await axios.post(
                `/profile/removeinteraction/blocked/${e.user_id}`,
                {}
            );
        }
        if (location === "settings") {
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    snackbarOpen: true,
                    snackbarType: "success",
                    snackbarMessage: "Successfully updated",
                },
            });
        } else if (location === "profile") {
            dispatch({
                type: UPDATE_BlOCKED,
                payload: "0",
            });
        }
    } catch (err) {
        dispatch({
            type: SET_SNACKBAR,
            payload: {
                snackbarOpen: true,
                snackbarType: "error",
                snackbarMessage:
                    "Something went wrong unblocking users. Try again.",
            },
        });
    }
};

export const deleteProfile = (history) => async (dispatch) => {
    try {
        const res = await axios.post("/profile/delete", { key: "delete" });
        if (res.data.error) {
            const error = res.data.error;
            dispatch(setAlert(error, "danger"));
        } else {
            dispatch({ type: LOGOUT });
            history.push("/");
        }
    } catch (error) {
        console.log(error);
    }
};
