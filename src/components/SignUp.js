import React, { Component } from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
import { withRouter } from 'react-router-dom'
import UsernameMessage from "./UsernameMessage";
const required = (val) => val && val.length;






class SignUp extends Component {
    constructor(props) {
        super(props);

        this.myRef = React.createRef();
        this.formRef = React.createRef();
    }

    componentDidMount = () => {

        if (this.props.isAuthenticated) {
            this.props.history.push({ pathname: "/menu" });
        }
    }
    componentDidUpdate = () => {

        if (this.props.isAuthenticated) {
            this.props.history.push({ pathname: "/menu" });
        }
    }
    handleSignup = (values, e) => {

        if (this.props.exists) {

            return;
        }

        this.props.signUp({ username: values.signUsername, firstname: values.firstname, lastname: values.lastname, password: values.signPassword });

    }

    handleFocusout = () => {
        // this.props.fetchUsers(this.myRef.current.value);
    }

    render() {
        return (<div className="container-fluid">
            <div className={`row form-con-row ${this.props.isDark ? "font-color back-color" : "font-color-light back-color-light"}`}>
                <LocalForm className={`login-from ${this.props.isDark ? "items-back-color font-color" : "items-back-color-light font-color-light"}`} onSubmit={(e, values) => this.handleSignup(e, values)}>
                    <h3 className="login_header">Sign Up</h3>
                    <FormGroup>


                        <Control.text onBlur={this.handleFocusout} getRef={() => this.myRef} model=".signUsername" id="signUsername" name="signUsername"
                            placeholder="Username"
                            autoComplete="off"
                            className="form-control"
                            validators={{
                                required
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".signUsername"
                            show="touched"
                            messages={{
                                required: 'Required',
                            }}
                        />
                        <UsernameMessage isLoading={this.props.isLoading} exists={this.props.exists} />
                    </FormGroup>
                    <FormGroup>


                        <Control.text model=".firstname" id="firstname" name="firstname"
                            placeholder="First Name"
                            autoComplete="off"
                            className="form-control"
                            validators={{
                                required,

                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".firstname"
                            show="touched"
                            messages={{
                                required: 'Required'
                            }}
                        />
                    </FormGroup>
                    <FormGroup>


                        <Control.text model=".lastname" id="lastname" name="lastname"
                            placeholder="Last Name"
                            autoComplete="off"
                            className="form-control"
                            validators={{
                                required
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".lastname"
                            show="touched"
                            messages={{
                                required: 'Required'
                            }}
                        />
                    </FormGroup>
                    <FormGroup>

                        <Control.password model=".signPassword" id="signPassword" name="signPassword"
                            placeholder="Password"
                            autoComplete="off"
                            className="form-control"
                            validators={{
                                required
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".signPassword"
                            show="touched"
                            messages={{
                                required: 'Required'
                            }}
                        />
                    </FormGroup>
                    <Button className="login-button" type="submit" value="submit" >Sign Up</Button>
                </LocalForm>
            </div>
        </div>)
    }

}
export default withRouter(SignUp);
