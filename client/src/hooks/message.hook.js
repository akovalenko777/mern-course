import { useCallback } from "react";

const useMessage = ()=>{
    return useCallback((text, type="default")=>{
        if(window.M || text){
            const types = {
                error:"red lighten-2",
                success:"green lighten-2",
                warning:"orange lighten-2",
                info:"cyan lighten-2",
                default:"grey lighten-2"
            };
            window.M.toast({html: text, classes:types[type]})
        }
    }, []);
}

export default useMessage