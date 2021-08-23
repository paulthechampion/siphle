import {FETCH_NEARBY} from "../actions/types"

export default function(state=[], action){
    switch(action.type){
        case FETCH_NEARBY:
            return action.payload
        default:
            return state
    }
}