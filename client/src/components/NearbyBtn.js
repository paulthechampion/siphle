import React, {useState, useContext, useEffect} from "react"

import {connect} from "react-redux"
import {fetchUserInfo} from "../actions"



function NearbyBtn({user,userInfo,fetchUserInfo}){
    const [following,setFollowing] = useState(false)
    const userId = user

    useEffect(()=>{
        fetchUserInfo()
        if(userInfo){
            console.log("seen")
            if(userInfo.following.includes(user._id)){
                console.log("seen2")
               setFollowing(true)
            }else{
                 setFollowing(false)
            }
        }
    },[])
        
    function followUser(user){
        fetch("/home/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
            followId:user
            })
        }).then(res=>res.json())
        .then(setFollowing(true))
    }

    function unfollowUser(user){
    fetch("/home/unfollow",{
        method:"put",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
        followId:user
        })
    }).then(res=>res.json())
    .then(setFollowing(false))
    }
  
    
    
    return(
        <div>
       {following?<button onClick={(()=>{unfollowUser(userId)})}>Unfollow</button>:
       <button onClick={(()=>{followUser(userId)})} >Follow</button>}
       </div>
    )

    }
function mapStateToProps({userInfo}){
        return {userInfo}
}

export default connect(mapStateToProps,{fetchUserInfo})(NearbyBtn)