import {FETCH_HOME} from "../actions/types"

export default function(state=[], action){
    switch(action.type){
        case FETCH_HOME:
            return action.payload
        default:
            return state
    }
}