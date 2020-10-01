import * as actionTypes from './actionTypes';


export const Cart = (state = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    totalPrice: localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0,
    cartIds: localStorage.getItem("cartIds") ? JSON.parse(localStorage.getItem("cartIds")) : [],
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cartReset: false,
}, action) => {
    switch (action.type) {
        case actionTypes.ADD_CART:
            let index = state.cartIds.indexOf(action.payload._id)
            if (index < 0) {
                let obj = {
                    "name": action.payload.name,
                    "image": action.payload.image,
                    "price": action.payload.price * 1,
                    "number": 1
                }
                let price = state.totalPrice + (action.payload.price * 1);
                localStorage.setItem("cartItems", JSON.stringify([...state.cartItems, obj]));
                localStorage.setItem("totalPrice", JSON.stringify(price));
                localStorage.setItem("cartIds", JSON.stringify([...state.cartIds, action.payload._id]));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems + 1));
                return { ...state, cartItems: [...state.cartItems, obj], totalPrice: price, cartIds: [...state.cartIds, action.payload._id], totalItems: state.totalItems + 1, cartReset: false };
            }
            else {
                let copycartItems = state.cartItems;
                let item = state.cartItems[index];
                item.price += action.payload.price * 1;
                item.number++;
                let price = state.totalPrice + action.payload.price * 1;
                copycartItems[index] = item;

                localStorage.setItem("cartItems", JSON.stringify([...copycartItems]));
                localStorage.setItem("totalPrice", JSON.stringify(price));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems + 1));
                return { ...state, cartItems: [...copycartItems], totalPrice: price, totalItems: state.totalItems + 1, cartReset: false };


            }



        case actionTypes.REMOVE_CART:
            let index1 = state.cartIds.indexOf(action.payload._id);
            let n = state.cartItems[index1].number;
            if (n === 1) {
                let copycartItems = state.cartItems;
                let copycartIds = state.cartIds;
                let price = state.totalPrice - action.payload.price * 1;
                copycartItems.splice(index1, 1);
                copycartIds.splice(index1, 1);
                localStorage.setItem("cartItems", JSON.stringify([...copycartItems]));
                localStorage.setItem("totalPrice", JSON.stringify(price));
                localStorage.setItem("cartIds", JSON.stringify([...copycartIds]));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems + 1));
                return { ...state, cartItems: [...copycartItems], totalPrice: price, cartIds: [...copycartIds], totalItems: state.totalItems - 1, cartReset: false };
            }
            else {
                let copycartItems = state.cartItems;
                let price = state.totalPrice - action.payload.price * 1;
                copycartItems[index1].number--;
                copycartItems[index1].price -= action.payload.price * 1;
                localStorage.setItem("cartItems", JSON.stringify([...copycartItems]));
                localStorage.setItem("totalPrice", JSON.stringify(price));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems + 1));
                return { ...state, cartItems: [...copycartItems], totalPrice: price, totalItems: state.totalItems - 1, cartReset: false };
            }
        case actionTypes.RESET_CART:
            localStorage.removeItem("cartItems");
            localStorage.removeItem("totalPrice");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("cartIds");
            return {
                ...state, cartItems: [],
                totalPrice: 0,
                cartIds: [],
                totalItems: 0,
                cartReset: true
            }
        default:
            return state;
    }
}