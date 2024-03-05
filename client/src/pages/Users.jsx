import React, { useEffect } from 'react';
import {saveUser, getUser} from '../services/userServices';
import {fName, lName, email} from '../components/UserForm';
// import SearchBar from '../components/SearchBar';
// import UserList from '../components/UserList';
// import UserForm from '../components/UserForm';

function Users() {
    const [fName, setFName] = React.useState('');
    const [lName, setLName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [resp, setResp] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [user, setUser] = React.useState({});

    useEffect(() => {
        getUser().then((res) => {
            setUsers(res.data);
        });
    })
}

export default Users;