import { useState, useEffect } from "react";


function useLocalStorage (key , init = null){
    const initialValue = localStorage.getItem(key) || init;
    const [item , setItem] = useState(initialValue)

    useEffect(()=>{
        if(item === null){
            localStorage.removeItem(key)
        }else{
            localStorage.setItem(key, item)
        }
    } , [key , item])

    return [item , setItem]
}


export default useLocalStorage;