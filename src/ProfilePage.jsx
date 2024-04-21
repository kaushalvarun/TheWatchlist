import React from 'react';
import NavBar from './NavBar';

function ProfilePage() {
    const storedUser = sessionStorage.getItem('user');
    const user = JSON.parse(storedUser);
    const userEmail = user ? user.email : '';
    const userName = user ? user.email.substr(0, user.email.indexOf('@')) : 'Guest';

    return (
        <>
            <NavBar userName={userName} />
            <div style={styles.container}>
                <h2 style={styles.heading}>Profile</h2>
                <p style={styles.text}><b>Name: </b>{userName}</p>
                <p style={styles.text}><b>Email: </b>{userEmail}</p>
            </div>
        </>
    );
}

const styles = {
    container: {
        backgroundColor: '#f5f5f5',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        fontSize: '36px',
        color: '#004953',
        marginBottom: '20px',
    },
    text: {
        fontSize: '16px',
        marginBottom: '10px',
    },
};

export default ProfilePage;
