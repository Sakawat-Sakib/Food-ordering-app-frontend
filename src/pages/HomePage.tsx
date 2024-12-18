import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import {useNavigate } from "react-router-dom"
import { useState } from "react"

const HomePage = () => {
        const [location] = useState("")
        const navigate = useNavigate()
        const handleSearchSubmit = (searchFromValues: SearchForm) => {
                navigate({
                        pathname: `/search/${searchFromValues.searchQuery}`
                })
        }
        const handleSearchClickSubmit = (searchValue: String) => {
                navigate({
                        pathname: `/search/${searchValue}`
                })
        }
  return (
    <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                    <h1 className="text-5xl font-bold tracking-tight text-orange-600">Tuck into a takeway today</h1>
                    <span className="text-xl">Food is just a click away</span>
                    <SearchBar placeHolder="Search City i.e Dhaka, Chattogram" onSubmit={handleSearchSubmit} searchQuery={location}/>
                    <div className="flex mx-auto gap-5">
                        <span onClick={()=> handleSearchClickSubmit("Dhaka")} className="px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">Dhaka</span>
                        <span onClick={()=> handleSearchClickSubmit("Chattogram")} className="px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">Chattogram</span>
                        <span onClick={()=> handleSearchClickSubmit("Manchester")} className="px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">Manchester</span>
                    </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                    <img src={landingImage} alt="" />
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <span className="font-bold text-3xl tracking-tighter">Order takeway even faster!</span>
                        <span>Download the Foody App for faster ordering and personalised recommendation</span>
                        <img src={appDownloadImage} alt="" />
                    </div>
            </div>
    </div>
  )
}

export default HomePage