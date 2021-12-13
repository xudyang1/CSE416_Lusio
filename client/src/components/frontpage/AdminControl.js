import { createRef, useContext } from "react";
import { AuthContext } from "../../context/AuthState";
import axios from "axios";
import M from "materialize-css";

export default function AdminControl() {
    const { isAuthenticated, user } = useContext(AuthContext);

    const badgeTitleRef = createRef();
    const badgeDescRef = createRef();
    const badgeImgRef = createRef();
    const conditionOp = createRef();
    const conditionValue = createRef();
    const conditionState = createRef();

    const suspendUserIDRef = createRef();
    const unsuspendUserIDRef = createRef();

    const onClickUploadBadge = async () => {

    };
    const onClickSuspendUser = async (profileId) => {
        try {
            const res = axios.post(`/api/admin/suspendUser/${profileId}`);
            M.toast({ html: 'SUCCESS', classes: 'rounded', inDuration: 500 });
        } catch (err) {
            M.toast({ html: err.response.data.msg, classes: 'rounded', inDuration: 500 });
        }
    };
    const onClickUnsuspendUser = async (profileId) => {
        try {
            const res = axios.post(`/api/admin/unSuspendUser/${profileId}`);
            M.toast({ html: 'SUCCESS', classes: 'rounded', inDuration: 500 });
        } catch (err) {
            M.toast({ html: err.response.data.msg, classes: 'rounded', inDuration: 500 });
        }
    };


    function showPage() {

        if (isAuthenticated && user.email === "lusioquiz@gmail.com") {
            return (
                <div className="container">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Badge Title" id="badge_title" type="text" ref={badgeTitleRef} />
                        </div>
                        <div className="input-field col s6">
                            <input placeholder="Badge Description" id="badge_description" type="text" ref={badgeDescRef} />
                        </div>
                        <div className="input-field col s6">
                            <input placeholder="Badge Img URL" id="badge_img" type="text" ref={badgeImgRef} />
                        </div>
                        <div className="input-field col s2">
                            <input placeholder="Condition Operations" id="badge_op" type="text" ref={conditionOp} />
                        </div>
                        <div className="input-field col s2">
                            <input placeholder="Condition Value" id="badge_val" type="text" ref={conditionValue} />
                        </div>
                        <div className="input-field col s2">
                            <input placeholder="Condition Stats" id="badge_stat" type="text" ref={conditionState} />
                        </div>
                        <a className="waves-effect waves-light btn" onClick={() => onClickUploadBadge()}>Upload New Badge to Database</a>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Suspend User (userID)" id="suspend_user" type="text" ref={suspendUserIDRef} />
                        </div>
                        <div className="input-field col s6">
                            <a className="waves-effect waves-light btn red" onClick={() => onClickSuspendUser()}>Suspend User</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Unsuspend User (userID)" id="unsuspend_user" type="text" ref={unsuspendUserIDRef} />
                        </div>
                        <div className="input-field col s6">
                            <a className="waves-effect waves-light btn red" onClick={() => onClickUnsuspendUser()}>Unsuspend User</a>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            {showPage()}
        </div>
    );
}