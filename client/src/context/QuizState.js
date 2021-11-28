import React, { createContext, useReducer } from 'react';
import QuizReducer from '../reducers/QuizReducer';
import {
    QUIZZES_LOADING,
    GET_QUIZZES,
    GET_QUIZ,
    UPDATE_QUIZ,
    ADD_QUIZ,
    DELETE_QUIZ,
    PLAY_QUIZ,
    FINISH_QUIZ,
    GET_ERRORS
} from '../types/actionTypes';
import axios from 'axios';

// Initial state
const initialState = {
// <<<<<<< LiuxinLi
    quizzes: [],
    /*
    quiz: {
        id: null,
        userId: null,
        //quizImgURI //Needs update
        //platformId: "", //Needs update
        name: null,
        author: null,
        quizImgURI: null,
        description: null,
        timedOption: false,
        time: 0,
        retakeOption: false,
        questions: [{
            title: null,
            choices: [""], 
            answerKey: 1, //correctAnswers
            score: 0
        }],
        likes: 0,
        plays: 0,
        isPublished: false,
        scoreBoard: []
    },
    */
    quiz: {},
    error: null,
    loading: true,
    isPlaying: true,
    played: false,
    score: 0,
    timeSpent: 0,
    //scoreB: []
};

// Create context
export const QuizzesContext = createContext(initialState);

export const QuizzesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    async function getQuizzes() {
        try {
            dispatch(setQuizzesLoading());
            const res = await axios.get('/api/quizzes');
            dispatch({
                type: GET_QUIZZES,
                payload: res.data
            });
            //console.log("quizzes are : ", res.data);
            return res.data;
        } catch (err) {
            console.error(err);
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    async function getQuiz(id, updateState=true) {
        try {
            if(updateState)
            dispatch(setQuizzesLoading());
            const res = await axios.get(`/api/quizzes/edit/${id}`);
            if(updateState)
            dispatch({
                type: GET_QUIZ,
                payload: id
            });
            //console.log("quiz is : ", res.data);
            return res.data;
        } catch (err) {
            console.error(err);
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    async function addQuiz({ userId, name, author, quizImgURI, description,  timedOption, time, retakeOption, questions, title, choices, content, answerKey, score, likes, plays, isPublished, scoreBoard, userName, userScore }) {
        //console.log("ADDQUIZ", userId)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        //{ userId, name, author, description, questions, likes, isPublished }
        const body = JSON.stringify({ userId, name, author, quizImgURI, description, timedOption, time, retakeOption, questions, title, choices, content, answerKey, score, likes, plays, isPublished, scoreBoard, userName, userScore });
        //console.log(body);
        try {
            const res = await axios.post('/api/quizzes/edit', body, config);
            dispatch({
                type: ADD_QUIZ,
                payload: res.data.quiz
                //{quiz: res.data.quiz, scoreBoard: res.data.quiz.scoreBoard}
            });
            return res.data.quiz.id;
        } catch (err) {
            //console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }

    async function updateQuiz({ id, userId, name, author, quizImgURI, description, timedOption, time, retakeOption, questions, likes, plays, isPublished, scoreBoard }) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ userId, name, author, quizImgURI, description, timedOption, time, retakeOption, questions, likes, plays, isPublished, scoreBoard });
        try {
            const res = await axios.put(`/api/quizzes/edit/${id}`, body, config);
            /*
            console.log("res.data.quiz.scoreBoard",res.data.quiz.scoreBoard);
            const scoreB = [];
            res.data.quiz.scoreBoard.map((u)=>scoreB.push({userName: u.userName, userScore: u.userScore}));
            console.log("scoreB", scoreB);
            */
            dispatch({
                type: UPDATE_QUIZ,
                payload: res.data.quiz
                //{quiz: res.data.quiz, scoreBoard: scoreB}
            });
            //console.log("After adding quiz, success, state: ", res.data);
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    async function deleteQuiz(id) {
        try {
            await axios.delete(`/api/quizzes/edit/${id}`);
            dispatch({
                type: DELETE_QUIZ,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }
    function playQuiz() {
        console.log("inPlayQuiz");
        try {
            dispatch({
                type: PLAY_QUIZ,
                //no data to be transferred
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS
            });
        }
    }
    function finishQuiz(score, timeSpent) {
      try {
        dispatch({
          type: FINISH_QUIZ,
          payload: {score: score, timeSpent: timeSpent}
        });
        //console.log("after the act of FINISH_QUIZ:", state.isPlaying);
      } catch (err){
        dispatch({
          type: GET_ERRORS
        });
      }
    }
    const setQuizzesLoading = () => {
        return {
            type: QUIZZES_LOADING
        };
    };
    return (<QuizzesContext.Provider value={{
        quizzes: state.quizzes,
        quiz: state.quiz,
        error: state.error,
        loading: state.loading,
        isPlaying: state.isPlaying,
        played: state.played,
        score: state.score,
        timeSpent: state.timeSpent,
        getQuizzes,
        getQuiz,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        playQuiz,
        finishQuiz
    }}>
        {children}
    </QuizzesContext.Provider>);
};