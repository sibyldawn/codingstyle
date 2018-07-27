const initialState = {
    user: {},
    bag: JSON.parse(localStorage.getItem('bag')) || [],
    login: false,
    name: '',
    price: 0,
    picture: '',
    qty: null,
    category: null,
    size: null,
    isAdmin: false,
    total: 0.00,
    submitted: false,
    userId: null,
}

const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_PRICE = "UPDATE_PRICE";
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_BAG = 'UPDATE_BAG';
const UPDATE_LOGIN = 'UPDATE_LOGIN';
const UPDATE_PICTURE = 'UPDATE_PICTURE';
const UPDATE_QTY = 'UPDATE_QTY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const UPDATE_SIZE = 'UPDATE_SIZE';
const UPDATE_ISADMIN = 'UPDATE_ISADMIN';
const UPDATE_ISNOTADMIN = 'UPDATE_ISNOTADMIN';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const UPDATE_USERID = 'UPDATE_USERID';
// const UPDATE_CART = "UPDATE_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const UPDATE_SUBMITTED = "UPDATED_SUBMITTED";
const UPDATE_CUSTOMERID = "UPDATE_CUSTOMERID";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const SET_CART = "SET_CART";
const SET_TOTAL = "SET_TOTAL";

export default function reducer(state = initialState,action){
    let newState = { ...state }
    switch(action.type){
        case UPDATE_BAG:
        localStorage.setItem('bag', JSON.stringify([...state.bag,action.payload]))
        return {
            ...state,
            bag: [...state.bag,action.payload]
        };
        case UPDATE_LOGIN:
        return {...state, login: action.payload};
        case UPDATE_USER:
        return {...state,user: action.payload};

        case UPDATE_NAME:
            return { ...state, name: action.payload };
       
        case UPDATE_PRICE:
            return { ...state, price: action.payload };

        case UPDATE_QUANTITY:
            let index = state.cart.findIndex((e) => e.id === +action.payload.id);
            state.cart[index].quantity = action.payload.quantity
            return { ...state};
        case UPDATE_PICTURE:
            return { ...state, image: action.payload };

        case UPDATE_ISADMIN:
            return { ...state, isAdmin: true };

        case UPDATE_ISNOTADMIN:
            return { ...state, isAdmin: false };

        //  case UPDATE_CART:
        //     newState.cart.push(action.payload);
        //     newState.total += (+action.payload.price * +action.payload.quantity);
        //     return {...newState};
        case DELETE_FROM_CART:
            newState.cart = action.payload.cart;
            newState.total = action.payload.total;
            return { ...newState };
        case UPDATE_SUBMITTED:    
            newState.submitted = action.payload;
            return { ...newState }; 
        case UPDATE_CUSTOMERID:
            newState.customerId = action.payload;
            return { ...newState };
        case SET_CART:
            return { ...state, cart: action.payload };  
        case SET_TOTAL:
            return { ...state, total: action.payload };  
        
      

        
        default:return state
        
    }
}

export function updateBag(id,name,price,size,category,picture) {
    console.log('------------ state', initialState)
    return {
        type: UPDATE_BAG,
        payload: {
            id,
            name,
            price,
            size,
            category,
            picture
        }
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateLogin(val) {
    return {
        type: UPDATE_LOGIN,
        payload: val 
    }
}

export function updateName(name) {
    return {
        type: UPDATE_NAME,
        payload: name,
    };
}

export function updatePrice(price) {
    return {
        type: UPDATE_PRICE,
        payload: price,
    };
}

export function updateQuantity(quantity) { 
    return {
        type: UPDATE_QUANTITY,
        payload: quantity
    }
}
export function updateImage(image) {
    return {
        type: UPDATE_PICTURE,
        payload: image,
    };

}
export function updateAdmin() {
    return {
        type: UPDATE_ISADMIN
    }
};
export function updateNotAdmin() {
    return {
        type: UPDATE_ISNOTADMIN
    }
};
// export function updateCart(cart) {
//     return {
//         type: UPDATE_CART,
//         payload: cart,
//     }
// }
export function deleteFromCart(cart) {
    return {
        type: DELETE_FROM_CART,
        payload: cart,
    }
}
export function updateSubmitted(submitted) {
    return {
        type: UPDATE_SUBMITTED,
        payload: submitted
    }
}
 
export function updateCustomerID(id) {
    return {
        type: UPDATE_CUSTOMERID,
        payload: id,
    }
}
export function setCart(cart) {
    return {
        type: SET_CART,
        payload: cart,
    }
}
export function setTotal(total) {
    return {
        type: SET_TOTAL,
        payload: total,
    }
}