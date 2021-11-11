import './css/App.css';
import React, { useContext, useEffect } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import HomePage from './components/frontpage/HomePage';
import SearchPage from './components/searchpage/SearchPage';
import ProfilePage from './components/profilepage/ProfilePage';
import PlatformPage from './components/platformpage/PlatformPage';
import EditQuizPage from './components/editquizpage/EditQuizPage';
import AppNavbar from './components/common/AppNavbar';
import { AuthProvider } from './context/AuthState';
import { ProfilesProvider } from './context/ProfileState';
function App() {
    return (
        <AuthProvider>
            <ProfilesProvider>
                <AppNavbar />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/search/:key" component={SearchPage} />
                    <Route path="/profile/:id" component={ProfilePage} />
                    <Route path="/platform/:id" component={PlatformPage} />
                    <Route path="/edit/:id" component={EditQuizPage} />
                </Switch>
            </ProfilesProvider>
        </AuthProvider>
    );

}

export default App;
