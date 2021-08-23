import {FETCH_USERINFO} from "../actions/types"

export default function(state =null,action){
    switch(action.type){
        case FETCH_USERINFO:
            return action.payload || false;
        default: 
            return state
    }
}