import React, {Component} from "react";
import 'materialize-css';
import '../../css/frontpage.css'

class QuizCards extends Component{
    render(){
        return(
            <div>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                    <span className="card-title truncate center">{this.props.name}</span>
                    <p>{this.props.desc}</p>
                    </div>
                    <div className="card-action">
                    <a href="#" style={{margin: "auto"}}>Play</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuizCards