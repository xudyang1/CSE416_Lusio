import React , { useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';
import { AuthContext } from "../../context/AuthState";
import QuizPageContent from "./QuizPageContent";
import QuizReport from "./QuizReport";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";

export default function QuizPage(){
    const {isAuthenticated} = useContext(AuthContext);
    const {id } = useParams();
    //const location = useLocation();
    
    useEffect(() => {
        var elem = document.querySelector('#reportModal')
        var options = {
            preventScrolling: false,
        };
        M.Modal.init(elem, options);
        
    })
    return(
        <div className="container z-depth-3" >
            <div className = "row">
                <div className="col s7 push-s4">
                    <br/>
                    <a className="waves-effect waves-light btn modal-trigger col push-s8" href="#reportModal"><i className="material-icons right">report</i>Report</a>
                    <div id="reportModal" className="modal">
                        {isAuthenticated ? (
                        <div>
                            <div className="modal-content">
                                <h4>Report a Problem</h4>
                                <QuizReport/>
                            </div>
                        </div>) :
                        (<div>
                            <div className="modal-content">
                                <h4>Please login first</h4>
                            </div>
                            <div className="modal-footer">
                                <a className="modal-close waves-effect waves-blue btn-flat">OK</a>
                            </div>
                        </div>)
                        }
                    </div>
                    <br/> 
                    <QuizPageContent/>
                    {/*{location.state ? <QuizPageContent played={this.props.played}/> :<QuizPageContent played="false"/>}*/}
                </div>
            </div>
        </div>
        )
}