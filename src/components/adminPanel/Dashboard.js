import React from "react"
import {Redirect} from "react-router-dom"
import MakeAdmin from './MakeAdmin'
import {connect} from "react-redux"

const AdminDashboard= ({auth})=>{
    // if(!auth.uid) return <Redirect to="/login" />
    return(
        <div className="container">
            <div className="text-center">
                <h2>Admin panel</h2>
            </div>
            <div>
                <MakeAdmin />
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(AdminDashboard)