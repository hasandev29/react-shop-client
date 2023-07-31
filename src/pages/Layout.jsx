import { Outlet } from "react-router-dom"
import Announcement from "../components/Announcement"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Newsletter from "../components/Newsletter"

export const Layout = () => {
  return (
    <>
    <Announcement />
    <Navbar />
    <Outlet />
    <Newsletter />
    <Footer />
    </>
  )
}
