import { logoutCurrentUser } from "@redux/actions/userActions"
import { auth } from "@services/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useAuth = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdToken()
          .then((idToken) => {
            dispatch({
              type: "SET_AUTHENTICATED",
              payload: true,
            })
          })
          .catch((error) => {
            console.error("Error getting ID token:", error)
          })
      } else {
        dispatch(logoutCurrentUser())
      }
    })

    return () => unsubscribe()
  }, [dispatch])
}

export default useAuth
