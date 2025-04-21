"use client"

import { API } from "@/Utils/Utils"
import axios from "axios"
import { createContext, useReducer } from "react"

let ExpenceArr = []


export const ExpenceContext = createContext()

async function getexpence(id) {
    try {
        const responce = await API.get(`/expence/getexpence/${id}`)
        return responce?.data
    } catch (error) {
        console.log(error);
    }
}

async function addexpence(id,body) {
    try {
        const responce = await API.post(`/expence/addexpence/${id}`,body)
        return responce?.status
    } catch (error) {
        console.log(error);
    }
}

async function deleteExpence(id) {
    try {
        const responce = await API.delete(`/expence/deleteexpence/${id}`)
        return responce
    } catch (error) {
        console.log(error);
    }
}


function reducer(state,action){
    try {
        switch (action.type) {
            case "ADD_EXPENCE":                
            let newstate = [...action.payload]
            return newstate
            default:
                state;
        }
    } catch (error) {
        console.log(error);
    }
}

export const ExpenceProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,ExpenceArr)
    return(
        <ExpenceContext.Provider value={{ExpenceData:state,dispatch,getexpence,addexpence,deleteExpence}}>
            {children}
        </ExpenceContext.Provider>
    )
}