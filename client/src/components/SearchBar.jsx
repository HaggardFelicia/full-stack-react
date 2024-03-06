import {useState} from 'react';

// eslint-disable-next-line react/prop-types
function SearchBar({ onSubmit }) {
    const [term, setTerm]= useState('');

    const handleChange = event => {
        console.log('event.target.value', event.target.value);
        setTerm(event.target.value);
    }

    return(
        <div style={styles.searchBar}>
            <h3>Director Search</h3>
            <form onSubmit={onSubmit} >
                <label htmlFor='search'>Search:</label>
                <input
                    type='text'
                    id='search'
                    name='search'
                    value={term}
                    onChange={handleChange}
                />
                {term.length <3 && <p>Search term must be at least 3 characters</p>}
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;

const styles = {
    searchBar: {
        backgroundColor: '#28666e',
        padding: '5% 20vw',
        margin: '0 auto',
    },
    h3: {
        color: 'white',
        fontSize: '20px',
        textAlign: 'center'
    }
};