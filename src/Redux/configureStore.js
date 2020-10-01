import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import { Dishes } from "./dishes";
import { Comments } from "./comment";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import { Auth } from "./auth"
import { Favorites } from "./favorites";
import { Cart } from "./cart";
import { Username } from "./username"
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { InitialFeedback } from "./forms";
import { Errors } from "./error";
const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
    middleware.push(require('redux-logger').default);
}

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            favorites: Favorites,
            cart: Cart,
            username: Username,
            errors: Errors,

            ...createForms({
                feedback: InitialFeedback
            })

        }),
        applyMiddleware(...middleware)
    );
    return store;
}

