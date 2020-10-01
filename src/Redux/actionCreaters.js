import * as ActionTypes from "./actionTypes";
import { baseUrl } from "../shared/baseUrl"

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId, rating, comment) => (dispatch) => {
    let newComment = {
        dishId: dishId,
        rating: rating,
        comment: comment
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + "comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"

    })
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                let err = new Error("Erros" + res.status + ":" + res.statusText);
                throw err;
            }
        }, (error) => {
            let err = new Error(error.message);
            throw err;
        })
        .then(res => res.json())
        .then(comment => dispatch(addComment(comment)))
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        })

}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + "dishes")
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                let err = new Error("Erros" + res.status + ":" + res.statusText);
                throw err;
            }
        }, (error) => {
            let err = new Error(error.message);
            throw err;
        })
        .then(res => res.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(err => {
            dispatch(dishesFailed(err.message));
        })
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
});
export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});



export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + "comments")
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                let err = new Error("Erros" + res.status + ":" + res.statusText);
                throw err;
            }
        }, (error) => {
            let err = new Error(error.message);
            throw err;
        })
        .then(res => res.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(err => {
            dispatch(failedComments(err.message));
        });
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})
export const failedComments = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
})



export const fetchPromos = () => (dispatch) => {
    dispatch(PromosLoading(true));
    return fetch(baseUrl + "promotions")
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                let err = new Error("Erros" + res.status + ":" + res.statusText);
                throw err;
            }
        }, (error) => {
            let err = new Error(error.message);
            throw err;
        })
        .then(res => res.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(err => {
            dispatch(failedPromos(err.message));
        })
}

export const PromosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
})
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})
export const failedPromos = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
})



export const fetchLeaders = () => (dispatch) => {
    dispatch(LeadersLoading(true));
    return fetch(baseUrl + "leaders")
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                let err = new Error("Erros" + res.status + ":" + res.statusText);
                throw err;
            }
        }, (error) => {
            let err = new Error(error.message);
            throw err;
        })
        .then(res => res.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(err => {
            dispatch(failedLeaders(err.message));
        })
}
export const LeadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
})
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})
export const failedLeaders = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
})


export const postFeedBack = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    let newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    };
    newFeedback.date = new Date().toISOString();

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + "feedback", {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"

    })
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                let err = new Error("Erros" + res.status + ":" + res.statusText);
                throw err;
            }
        }, (error) => {
            let err = new Error(error.message);
            throw err;
        })
        .then(res => res.json())
        .then(feedback => {

            alert("Thank You for you feedback. Your feedback: " + JSON.stringify(feedback));
            window.location.reload();
        }
        )
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        })

}


export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: user.token,
        firstname: user.firstname,
        lastname: user.lastname
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (cred) => (dispatch) => {

    dispatch(requestLogin(cred))

    return fetch(baseUrl + "users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cred)
    })
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {

                if (res.status === 401) {
                    let err = new Error("Username or Password is incorrect!!");
                    throw err;

                }
                else {
                    let err = new Error("Erros" + res.status + ":" + res.statusText);
                    err.response = res;
                    throw err;
                }
            }
        }, error => {
            dispatch(loginError(error.message));
        })
        .then((res) => res.json())
        .then(res => {

            if (res.sucess) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("creds", JSON.stringify(cred))
                dispatch(fetchFavorites());
                dispatch(receiveLogin(res));
            }
            else {

                var error = new Error("Error " + res.status);
                error.response = res;
                dispatch(loginError(error.message));
            }
        })
        .catch(err => dispatch(loginError(err.message)))

};

export const signUp = (creds) => (dispatch) => {
    return fetch(baseUrl + "users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(creds)
    })
        .then((res) => {
            if (res.ok) {
                return res;
            }
            else {
                let err = new Error("Erros" + res.status + ":" + res.statusText);
                err.response = res;
                throw err;
            }
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.sucess) {


                dispatch(loginUser(res.user));
            }
            else {
                var error = new Error("Error " + res.status);
                error.response = res;
                throw error;
            }


        })


}


export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}


export const postFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "POST",
        body: JSON.stringify({ "_id": dishId }),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => { dispatch(addFavorites(favorites)); })
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => { dispatch(addFavorites(favorites)); })
        .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(favorites => {

            dispatch(addFavorites(favorites))
        })
        .catch(error => dispatch(favoritesFailed(error.message)));
}
export const fetchUsers = (username) => (dispatch) => {

    dispatch(usernameLoading(true))

    return fetch(baseUrl + 'users/checkuser', {
        headers: {
            'username': username
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(res => {
            dispatch(gotUser(res.exists))
        })
        .catch(error => dispatch(usernameErr(error.message)));
}
export const gotUser = (exists) => ({
    type: ActionTypes.GOT_USERNAME,
    payload: exists
})
export const usernameLoading = () => ({
    type: ActionTypes.USERNAME_LOADING,

})
export const usernameErr = (errMess) => ({
    type: ActionTypes.USERNAME_FAILED,
    payload: errMess
})

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});
export const addCart = (dish) => ({
    type: ActionTypes.ADD_CART,
    payload: dish
});
export const removeCart = (dish) => ({
    type: ActionTypes.REMOVE_CART,
    payload: dish
});

export const resetCart = () => ({
    type: ActionTypes.RESET_CART,
})
export const addError = () => ({
    type: ActionTypes.SHOW_ERROR,

});
export const removeError = () => ({
    type: ActionTypes.HIDE_ERROR,
});

export const fetchPayment = (token, product) => (dispatch) => {
    const body = {
        token,
        product
    }
    const headers = {
        "Content-Type": "application/json"
    }
    fetch(baseUrl + 'payments', {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        credentials: "same-origin"
    })
        .then((res) => res.json())
        .then((res) => {

            window.open(res.receipt_url, "_blank");
            dispatch(resetCart(true));

        })
        .catch((err) => {
            console.log(err);
        })

}