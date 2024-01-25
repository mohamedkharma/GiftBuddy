import React, { useState, useEffect } from "react"

//Initalize authentication context state
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogOut: () => {},
  onLogIn: () => {},
})

//export the component to "wrap" around the <App/> component in index.js
export const AuthContextProvider = (props) => {
  //create usestate for the log in status, initally set to false, not logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //grab the current log in value from the local store (cache??) ON MOUNT
  useEffect(() => {
    const localLoginValue = localStorage.getItem("isLoggedIn")
    if (localLoginValue === "1") {
      setIsLoggedIn(true)
    }
  }, [])

  //Function to handle the log out state
  const onLogOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn") //remove status from the local store
  }

  //Function to handle the Log in state
  const onLogIn = (email, password) => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "1") //create a isLoggedIn status in the local store and set to 1
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogIn: onLogIn, onLogOut: onLogOut }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
