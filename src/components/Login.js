import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'



function LoginError(props) {
    if (props.errMess) {
        return <div style={{ color: "#dc3545" }}>{props.errMess}</div>
    }
    else {
        return (<div></div>)
    }

}

class Login extends Component {

    componentDidMount = () => {
        if (this.props.isAuthenticated) {
            this.props.history.push({ pathname: "/menu" });
        }
    }
    componentDidUpdate = () => {

    }
    handleLogin = (e) => {
        this.props.loginUser({ username: this.username.value, password: this.password.value });
        e.preventDefault();
    }


    render() {
        return (<div className="container-fluid">
            <div className={`row form-con-row ${this.props.isDark ? "font-color back-color" : "font-color-light back-color-light"}`}>
                <Form className={`login-from ${this.props.isDark ? "items-back-color font-color" : "items-back-color-light font-color-light"}`} onSubmit={this.handleLogin}>
                    <h3 className="login_header">Log In</h3>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" id="username" innerRef={(input) => { this.username = input }} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="username">Password</Label>
                        <Input type="password" name="password" id="password" innerRef={(input) => { this.password = input }} />
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="remember"
                                innerRef={(input) => this.remember = input} />
                Remember me
            </Label>
                    </FormGroup>
                    <LoginError errMess={this.props.errMess} />
                    <Button className="login-button" type="submit" value="submit" >Login</Button>
                </Form>
            </div>
        </div>)
    }

}
export default withRouter(Login);
