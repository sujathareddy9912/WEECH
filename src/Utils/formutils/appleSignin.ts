
import appleAuth from "@invertase/react-native-apple-authentication";


export const IsAppleAuthSupported = ()=>{
    return appleAuth.isSupported;
}


export const AppleAuthentiocation = async()=>{
    try {
        let auth = await appleAuth.performRequest({
            requestedOperation:appleAuth.Operation.LOGIN,
            requestedScopes:[appleAuth.Scope.FULL_NAME,appleAuth.Scope.EMAIL]
          })
          return auth 
    }
 catch(e){
    throw (e)
 }
}
