import { createContext, useContext, useRef, useState } from "react"
import AuthContext from "./authprovider"

function UseAuth() {
  return (
    useContext(AuthContext)
  );
}

export default UseAuth