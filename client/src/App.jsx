import  'react';
import './index.css';
import SearchBar from './components/SearchBar.jsx';
// eslint-disable-next-line no-unused-vars
import API from './API';
import "./App.css";

function App(){
  const handleSearch = async event => {
    event.preventDefault();
    console.log("searching for", event.target.search.value);
    const response = await API.fetchDirectors();
    console.log('From our API', response.data );
  }


  return(
    <div>
      <SearchBar onSubmit={handleSearch}/>
    </div>
  )
}

export default App;