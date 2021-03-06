const initialState = {
    user: {},
    user_img: '',
    login: false,
    name: '',
    price: 0,
    picture: '',
    category: null,
    size: null,
    isAdmin: false,
    total: 0,
    submitted: false,
    orderId: 0,
}
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_ORDER_ID = "UPDATE_ORDER_ID"
const UPDATE_USER_IMAGE = "UPDATE_USER_IMAGE";
const UPDATE_PRICE = "UPDATE_PRICE";
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_LOGIN = 'UPDATE_LOGIN';
const UPDATE_PICTURE = 'UPDATE_PICTURE';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const UPDATE_SIZE = 'UPDATE_SIZE';
const UPDATE_ISADMIN = 'UPDATE_ISADMIN';
const UPDATE_ISNOTADMIN = 'UPDATE_ISNOTADMIN';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const DELETE_FROM_CART = "DELETE_FROM_CART";
const UPDATE_SUBMITTED = "UPDATED_SUBMITTED";
const UPDATE_CUSTOMERID = "UPDATE_CUSTOMERID";



export default function reducer(state = initialState,action){
    let newState = { ...state }
    switch(action.type){
       
        case UPDATE_LOGIN:
        return {...state, login: action.payload};
        case UPDATE_USER:
        return {...state,user: action.payload};
        case UPDATE_USER_IMAGE:
        return {...state,user_img: action.payload};

        case UPDATE_NAME:
            return { ...state, name: action.payload };
       
        case UPDATE_PRICE:
            return { ...state, price: action.payload };
        case UPDATE_TOTAL:
            return { ...state, total: action.payload };

        case UPDATE_PICTURE:
            return { ...state, picture: action.payload };
        case UPDATE_CATEGORY:
            return { ...state, category: action.payload };
        case UPDATE_SIZE:
            return { ...state, size: action.payload };
        case UPDATE_ISADMIN:
            return { ...state, isAdmin: true };

        case UPDATE_ISNOTADMIN:
            return { ...state, isAdmin: false };
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

        case UPDATE_ORDER_ID:
           return {...state, orderId:action.payload };
      

        
        default:return state
        
    }
}


export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function updateUserImage(user_img) {
    return {
        type: UPDATE_USER,
        payload: user_img
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

export function updateSize(size) {
    return {
        type: UPDATE_SIZE,
        payload: size,
    };
}
export function updatePicture(picture) {
    return {
        type: UPDATE_PICTURE,
        payload: picture,
    };

}
export function updateCategory(category) {
    return {
        type: UPDATE_CATEGORY,
        payload: category,
    };

}

export function updateTotal(total) {
    return {
        type: UPDATE_TOTAL,
        payload: total,
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

export function updateOrderId(orderId){
    return{
        type: UPDATE_ORDER_ID,
        payload: orderId
    }
}
