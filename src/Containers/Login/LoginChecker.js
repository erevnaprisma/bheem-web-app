import {getSession,setSession} from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
export const isLogin = (route)=>{
    if(getSession(AppConfig.sessionToken)){
        
    }
}