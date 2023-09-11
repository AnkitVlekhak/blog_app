import * as AuthApi from '../api/AuthRequest.js'
export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        // const auth = await AuthApi.signUp(formData)
        console.log(auth);
        dispatch({ type: "AUTH_SUCCESS", data: auth.data })

    } catch (error) {
        dispatch({ type: "AUTH_FAILED" })
        console.log(error);
    }
}

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        // const auth = await AuthApi.logIn(formData)
        dispatch({ type: "AUTH_SUCCESS", data: auth.data })

    } catch (error) {
        dispatch({ type: "AUTH_FAILED" })
        console.log(error);
    }
}

export const logOut = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT" })
}