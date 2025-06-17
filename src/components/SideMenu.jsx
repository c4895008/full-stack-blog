import Search from "./Search";
import { Link, useSearchParams } from "react-router-dom";
export default function SideMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFilterChange = (event) => {
    if (searchParams.get("sort") === event.target.value) {
      return; // No change needed if the value is already selected
    }
    const value = event.target.value;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort: value,
    });
  };
  const handleCategoryChange = (category) => {
    if (searchParams.get("category") === category) {
      return; // No change needed if the category is already selected
    }
    const obj = {
      ...Object.fromEntries(searchParams),
      cat: category,
    };
    if(category === 'general') {
      delete obj.cat; // Remove category if 'All' is selected
    }
    setSearchParams(obj);
  };
  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={handleFilterChange}
            type="radio"
            name="sort"
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />
          Newest
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={handleFilterChange}
            type="radio"
            name="sort"
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />
          Most Popular
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={handleFilterChange}
            type="radio"
            name="sort"
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />
          Trending
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={handleFilterChange}
            type="radio"
            name="sort"
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span onClick={()=>{handleCategoryChange('general')}} className="underline cursor-pointer" >All</span>
        <span onClick={()=>{handleCategoryChange('web-design')}} className="underline cursor-pointer">Web Design</span>
        <span onClick={()=>{handleCategoryChange('development')}} className="underline cursor-pointer">Development</span>
        <span onClick={()=>{handleCategoryChange('databases')}} className="underline cursor-pointer">Databases</span>
        <span onClick={()=>{handleCategoryChange('seo')}} className="underline cursor-pointer">Search Engines</span>
        <span onClick={()=>{handleCategoryChange('marketing')}} className="underline cursor-pointer">Marketing</span>
      </div>
    </div>
  );
}
