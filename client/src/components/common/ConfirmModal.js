/**
 * 
 * @param {props} props  Takes props.msgTitle, props.msgBody, props.callback, props.id
 */

import M from "materialize-css";
import { useEffect, useRef } from "react";
import '../../css/section.css'
export default function ConfirmModal(props) {
    const msgTitle = props.msgTitle ? props.msgTitle : "Title"
    const msgBody = props.msgBody ? props.msgBody : "message"
    const callback = props.callback
    const id = props.id ? props.id : "confirmModal"


    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            dismissible: true,
            preventScrolling: true
        });
    })

    return (
        <div>
            <a className="right btn-floating btn-small waves-effect waves-light red modal-trigger" href={"#"+id+"confirmModal"} style={{ fontSize: "0em" }} ><i className="material-icons">delete</i></a>
            <div id={id+"confirmModal"} className="confirmModal modal">
                <div className="modal-content" style={{ height: "55%" }}>
                    <h4>{msgTitle}</h4>
                    <p>{msgBody}</p>
                </div>
                <div className="modal-footer" style={{ textAlign: "center" }}>
                    <a href="#!" className="modal-close wave-effect btn-flat" onClick={ props.callback }>Confirm</a>
                    <a href="#!" className="modal-close wave-effect btn-flat">Close</a>
                </div>
            </div>
        </div>
    )
}