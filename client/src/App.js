import './css/App.css';
import React, { useContext, useEffect } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import HomePage from './components/frontpage/HomePage';
import SearchPage from './components/searchpage/SearchPage';
import ProfilePage from './components/profilepage/ProfilePage';
import PlatformPage from './components/platformpage/PlatformPage';
import QuizPage from './components/quizpage/QuizPage';
import EditQuizPage from './components/editquizpage/EditQuizPage';
import PlayQuizPage from './components/playquizpage/PlayQuizPage';
import AppNavbar from './components/common/AppNavbar';
import { AuthProvider } from './context/AuthState';
import { ProfilesProvider } from './context/ProfileState';
import { QuizzesProvider } from './context/QuizState';

function App() {
    return (
        <AuthProvider>
            <ProfilesProvider>
                <AppNavbar />
                <QuizzesProvider>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/quiz/:id" component={QuizPage} />
                    <Route path="/edit/:id" component={EditQuizPage} />
                    <Route path="/play/:id" component={PlayQuizPage} />
                    <Route path="/search/:key" component={SearchPage} />
                    <Route path="/profile/:id" component={ProfilePage} />
                    <Route path="/platform/:id" component={PlatformPage} />
                </QuizzesProvider>
            </ProfilesProvider>
        </AuthProvider>
    );
}

export default App;
