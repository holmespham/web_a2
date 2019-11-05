import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

function products(state = [], action){
    if(action.type=='FETCH_PRODUCTS'){
        console.log(action.payload)
        return action.payload
    }
    else if(action.type=='ADD_PRODUCT'){
        return [].concat(state, action.payload)
    }
    else if(action.type=='FETCH_PRODUCT'){
        console.log(action.payload)
        return action.payload
    }
    else if(action.type=='DELETE_PRODUCT'){
        
        return state.filter(s=>s._id!=action.payload)
    }
    else
        return state
}
function types(state = [], action){
    if(action.type=='FETCH_TYPES'){
        console.log(action.payload)
        return action.payload
    }
    else if(action.type=='ADD_TYPE'){
        return [].concat(state, action.payload)
    }
    else if(action.type=='DELETE_TYPE'){
        
        return state.filter(s=>s._id!=action.payload)
    }
    else
        return state
}

function editingProduct(state={},action){
    if(action.type==='EDIT_PRODUCT'){
        return action.payload
    }
    else 
        return state
}
function editingType(state={},action){
    if(action.type==='EDIT_TYPE'){
        return action.payload
    }
    else 
        return state
}
function selectedProduct(state={},action){
    if(action.type==='SELECT_PRODUCT'){
        return action.payload
    }
    else 
        return state
}


var centralState = combineReducers({
   products, editingProduct, selectedProduct,types, editingType
})

var store = createStore(centralState, applyMiddleware(thunk))


ReactDOM.render(
<Provider store={store}>    
    <App />
</Provider>    
    , document.getElementById('app')

)