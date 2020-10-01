import React, { Component } from 'react';
import { connect } from "react-redux";
import Loader from 'react-loader-spinner'
const mapStatetoProps = (state) => {
    return state.username;
}
class UsernameMessage extends Component {
    render() {
        if (this.props.isLoading) {
            return (<div className="col-12 loader-container_username">
                <Loader
                    type="Oval"
                    color="#171a29"
                    secondaryColor="#9575CD"
                    height={20}
                    width={20}


                />

            </div>);
        }
        else if (!this.props.exists) {
            return (<div></div>);
        }
        else {
            return (<div style={{ color: "#dc3545" }}>Username not available!!</div>);
        }
    }
}
export default connect(mapStatetoProps)(UsernameMessage);