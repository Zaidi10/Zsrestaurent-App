import React, { Component } from 'react'
import { Nav, Navbar, NavbarToggler, Collapse, NavItem, Jumbotron, Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            isNavOpen: false,
            ispopoverOpen: false,
            isAuthenticated: this.props.auth.isAuthenticated,
            cartReset: false,
        }
        window.addEventListener("click", (e) => this.handleWindowClick(e))
    }
    handleWindowClick = (e) => {
        if (this.myRef.current) {
            if (!e.target.classList.contains("navbar-toggler") && !e.target.classList.contains("navbar-toggler-icon")) {
                this.setState({ isNavOpen: false });
            }
        }
    }

    errorOccured = () => {
        store.addNotification({
            title: "You are not Loged In!",
            message: "Please Login or Signin first!",
            type: "info",
            insert: "top",
            showIcon: true,
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 4000,
            }
        });
    }

    loginSucess = () => {
        store.addNotification({
            title: "Sucess!",
            message: "You are Succefully Loged In!",
            type: "success",
            insert: "top",
            showIcon: true,
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 4000,

            }
        });
    }
    paymentSucess = () => {
        store.addNotification({
            title: "Sucess!",
            message: "Your Transaction was successfull!",
            type: "success",
            insert: "top",
            showIcon: true,
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 8000,
            }
        });
    }
    logoutSucess = () => {
        store.addNotification({
            title: "Sucess!",
            message: "You are Succefully Loged Out!",
            type: "success",
            insert: "top",
            showIcon: true,
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 4000,

            }
        });
    }
    componentDidUpdate = () => {
        if (this.props.auth.isAuthenticated !== this.state.isAuthenticated) {
            this.setState({ isAuthenticated: this.props.auth.isAuthenticated });
            if (this.props.auth.isAuthenticated) {
                this.loginSucess();
            }
            else {
                this.logoutSucess();
            }

        }
        if (this.props.cartReset !== this.state.cartReset) {
            if (this.props.cartReset) {
                this.paymentSucess()
            }
            this.setState({ cartReset: this.props.cartReset })
        }
        if (this.props.isError) {
            this.errorOccured();
            this.props.removeError();
        }
    }
    toggleNav = () => {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    handleLogout = () => {
        this.props.logoutUser();
    }
    togglePop = () => {

        this.setState({ ispopoverOpen: !this.state.ispopoverOpen });
    }
    handleCloseNav = () => {

        this.setState({ isNavOpen: !this.state.isNavOpen });
    }


    render() {
        return (
            <React.Fragment>
                <ReactNotification />
                <Navbar className={`${this.props.isDark ? "header-con navbar-dark" : "header-con-light navbar-light"}`} export expand="md">
                    <div className="container-fluid">
                        <NavbarToggler onClick={this.toggleNav} />

                        <Collapse ref={this.myRef} isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem className={`${this.props.isDark ? "nav_li_item" : "nav_li_item-light"}`}><NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg head-icon"></span>Home</NavLink></NavItem>
                                {!this.props.auth.isAuthenticated ?
                                    (<><NavItem className={`${this.props.isDark ? "nav_li_item" : "nav_li_item-light"}`}><NavLink className="nav-link" to="/login"><span className="fa fa-sign-in fa-lg head-icon"></span>Login</NavLink></NavItem>
                                        <NavItem className={`${this.props.isDark ? "nav_li_item" : "nav_li_item-light"}`}><NavLink className="nav-link" to="/signup"><span className="fa fa-sign-in fa-lg head-icon"></span>Sign Up</NavLink></NavItem>
                                    </>)
                                    : (<><NavItem className={`${this.props.isDark ? "nav_li_item" : "nav_li_item-light"}`}><NavLink className="nav-link" to="/favorites"><span className="fa fa-heart fa-lg"></span>Favorites</NavLink></NavItem></>)
                                }
                                <NavItem className={`${this.props.isDark ? "nav_li_item" : "nav_li_item-light"}`}><NavLink className="nav-link" to="/aboutus"><span className="fa fa-info fa-lg head-icon"></span>About</NavLink></NavItem>
                                <NavItem className={`${this.props.isDark ? "nav_li_item" : "nav_li_item-light"}`}><NavLink className="nav-link" to="/menu"><span className="fa fa-list fa-lg head-icon"></span>Menu</NavLink></NavItem>
                                <NavItem className={`${this.props.isDark ? "nav_li_item" : "nav_li_item-light"}`}><NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg head-icon"></span>Contact Us</NavLink></NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {!this.props.auth.isAuthenticated ?
                                        ""
                                        :
                                        <div>

                                            <Button outline className="pop_button" id="Popover1" type="button">
                                                <i className="fa fa-user-circle-o icon-user" aria-hidden="true"></i>
                                            </Button>
                                            <Popover placement="bottom" isOpen={this.state.ispopoverOpen} target="Popover1" toggle={this.togglePop}>
                                                <PopoverHeader className="pop-head">Profile</PopoverHeader>
                                                <PopoverBody className="pop-body"><div>
                                                    <img width="140" height="130" src={require('../shared/avatar1.jpg')} alt="avatar" ></img>
                                                </div>
                                                    <div className="username_pop">{this.props.user.username}</div>
                                                    <div className="user-names">{this.props.user.firstname} {this.props.user.lastname}</div>
                                                </PopoverBody>
                                            </Popover>

                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                    {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron className={`${this.props.isDark ? "jummbo" : "jummbo-light"}`}>
                    <div className="container-fluid">
                        <div className="row row-header jumbo_content">
                            <div className="col-12 col-sm-6">
                                <h1>Zaidi'S Resturent</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

            </React.Fragment>
        )
    }
}
