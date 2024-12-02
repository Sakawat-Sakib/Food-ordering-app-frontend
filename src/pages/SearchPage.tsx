import { useSearchRestaurants } from "@/api/RestaurantApi"
import CuisineFilter from "@/components/CuisineFilter"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import SortOptionDropDown from "@/components/SortOptionDropDown"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;

}

const SearchPage = () => {
    const {city} = useParams()

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines : [],
        sortOption: "lastUpdated"
    })

    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const {results, isLoading} = useSearchRestaurants(searchState, city) //data supplier 

    const setSortOption = (sortOption: string) => {
        setSearchState((prev)=>({
            ...prev,
            sortOption,
            page: 1,
        }))
    }


    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prev)=>({
            ...prev,
            selectedCuisines,
            page: 1,
        }))
    }

    const setPage = (page:number) => {
        setSearchState((prev)=>({
            ...prev,
            page,
        }))
    }

    const setSearchQuery = (searchFromValues: SearchForm) => {
         setSearchState((prev)=>({
            ...prev,
            searchQuery: searchFromValues.searchQuery,
            page: 1
        }))
       
    }

    const resetSearch = () => {
        setSearchState((prev)=>({
            ...prev,
            searchQuery: '',
            page: 1,
        }))
    }

    if(isLoading){
        return <span>Loading...</span>
    }

    if(!results?.data || !city){
        return <span>No results found</span>
    }

   

  return (
    <div className="grid lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">
            <CuisineFilter selectedCuisines={searchState.selectedCuisines} onChange={setSelectedCuisines} isExpanded={isExpanded} onExpandedClick={()=> setIsExpanded((prev)=> !prev)}/>
        </div>

        <div id="main-content" className="flex flex-col gap-5">
            <SearchBar searchQuery={searchState.searchQuery} onReset={resetSearch} onSubmit={setSearchQuery} placeHolder="Search by Cuisine or Restaurant name"/>
            
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <SearchResultInfo city={city} total={results.pagination.total} />

                <SortOptionDropDown onChange={setSortOption} sortOption={searchState.sortOption}/>
            </div>
            

            {results?.data.map((item)=>(
                <SearchResultCard restaurant={item}/>
            ))}

            <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}/>
        </div>
    </div>
        
    )
}

export default SearchPage