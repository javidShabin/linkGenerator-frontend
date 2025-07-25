import { Outlet } from "react-router-dom"
import Header from "../components/Header"



const UserLayout = () => {

  return (
    <>
  <Header />
  <Outlet />
    </>
  )
}

export default UserLayout
