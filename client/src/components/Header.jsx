import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const handleAiSearch = () => {
    navigate('/ai-suggestions')
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-900 shadow-md">
      <div className="flex justify-between flex-wrap items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-semibold mr-4 text-2xl sm:text-3xl flex font-serif text-white flex-wrap">
            Arova
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-sm flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

       

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-200 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-200 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <li className="text-slate-200 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
         {/* AI Button */}
         <button
          className="ml-4 bg-green-500 mt-4 lg:mt-0 text-white px-10 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={handleAiSearch}
        >
          AI Suggestions
        </button>
      </div>
    </header>
  );
};

export default Header;