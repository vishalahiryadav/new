import { getAuth, onAuthStateChanged } from "../firebase.js";
function RedirectUnAuthUser(){
 
        const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
            if (!currentUser) {
              window.location.href = "/";
            }
          });
         
          return () => unsubscribe();
}
export default RedirectUnAuthUser