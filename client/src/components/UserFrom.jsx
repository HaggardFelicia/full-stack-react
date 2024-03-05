import React from 'react';

const UserForm = props =>{
    return(
        <form onSubmit={props.addUser} style={styles.UsersForm}>
            <p>Add User:</p>
            <label>First Name:</label>
             <Input
                id="fName"
                type="text"
                placeholder='First Name'
                value={props.fName}
                onChange={props.fNameInput}
            />
            <label>Last Name:</label>
             <Input
                id="lName"
                type="text"
                placeholder='Last Name'
                value={props.lName}
                onChange={props.lNameInput}
            />
        </form>
    )
}

export default UserForm;

const styles = {
    UsersForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        margin: '10px'
    }
};