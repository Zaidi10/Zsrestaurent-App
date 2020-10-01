import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent"
import DishdDetails from "./DishdetailsComponent";
import Favorites from "./FavoriteComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent"
import Home from "./HomeComponent";
import Login from "./Login";
import SignUp from "./SignUp";
import { connect } from "react-redux"
import { postComment, postFeedBack, fetchDishes, fetchComments, fetchPromos, fetchLeaders, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite, addCart, removeCart, signUp, fetchUsers, fetchPayment, addError, removeError } from "../Redux/actionCreaters"
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
const mapStatetoProps = (state) => {
    return state;
}

const mapDispatchtoProps = (dispatch) => ({
    postComment: (dishId, author, rating, comment) => dispatch(postComment(dishId, author, rating, comment)),
    postFeedBack: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedBack(firstname, lastname, telnum, email, agree, contactType, message)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => { dispatch(actions.reset("feedback")) },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchFavorites: () => dispatch(fetchFavorites()),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
    addCart: (dish) => dispatch(addCart(dish)),
    removeCart: (dish) => dispatch(removeCart(dish)),
    signUp: (cred) => dispatch(signUp(cred)),
    fetchUsers: (username) => dispatch(fetchUsers(username)),
    fetchPayment: (token, product) => dispatch(fetchPayment(token, product)),
    removeError: () => dispatch(removeError()),
    addError: () => dispatch(addError())

})




class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDark: localStorage.getItem("isDark") ? JSON.parse(localStorage.getItem("isDark")) : false,
        }
    }
    handleModeChange = () => {
        localStorage.setItem("isDark", JSON.stringify(!this.state.isDark));
        this.setState({ isDark: !this.state.isDark })

    }
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchFavorites();
    }
    componentDidUpdate = () => {
        if (this.props.favorites.errMess === "Error 401: Unauthorized" && this.props.auth.isAuthenticated) {
            this.props.logoutUser();
            this.props.history.push({ pathname: "/login" });
        }

    }
    homecomponent = () => {
        return (<Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            disherrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess={this.props.leaders.errMess}
            handleModeChange={this.handleModeChange}
            isDark={this.state.isDark}
        />);
    }
    handleAddCart = (dish) => {
        this.props.addCart(dish);
    }
    handleRemoveCart = (dish) => {
        this.props.removeCart(dish);
    }

    render() {
        const DishWithId = ({ match }) => {
            return (
                this.props.auth.isAuthenticated
                    ?
                    <DishdDetails dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
                        isLoading={this.props.dishes.isLoading}
                        errMess={this.props.dishes.errMess}
                        comments={this.props.comments.comments.filter((comment) => comment.dishId === match.params.dishId)}
                        commentsErrMess={this.props.comments.errMess}
                        postComment={this.props.postComment}
                        favorite={this.props.favorites.favorites === null ? false : this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
                        postFavorite={this.props.postFavorite}
                        isDark={this.state.isDark}
                    />
                    :
                    <DishdDetails dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
                        isLoading={this.props.dishes.isLoading}
                        errMess={this.props.dishes.errMess}
                        comments={this.props.comments.comments.filter((comment) => comment.dishId === match.params.dishId)}
                        commentsErrMess={this.props.comments.errMess}
                        postComment={this.props.postComment}
                        favorite={false}
                        postFavorite={this.props.postFavorite}
                        isDark={this.state.isDark}
                    />
            );
        }
        return (
            <HashRouter>
                <div className="App">
                    <Header auth={this.props.auth}
                        logoutUser={this.props.logoutUser}
                        user={this.props.auth.user}
                        isDark={this.state.isDark}
                        cartReset={this.props.cart.cartReset}
                        isError={this.props.errors.isError}
                        removeError={this.props.removeError}
                    />
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path="/home" component={this.homecomponent} />
                                <Route exact path='/menu' render={() => <Menu addError={this.props.addError} dishes={this.props.dishes.dishes} fetchPayment={this.props.fetchPayment} totalItems={this.props.cart.totalItems} cartItems={this.props.cart.cartItems} cartReset={this.props.cart.cartReset} cartIds={this.props.cart.cardIds} totalPrice={this.props.cart.totalPrice} handleAddCart={this.handleAddCart} handleRemoveCart={this.handleRemoveCart} isAuthenticated={this.props.auth.isAuthenticated} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess} isDark={this.state.isDark} />} />
                                <Route path="/menu/:dishId" render={DishWithId} isDark={this.state.isDark} />
                                <Route exact path="/favorites" render={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} isAuthenticated={this.props.auth.isAuthenticated} isDark={this.state.isDark} />} />
                                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedBack={this.props.postFeedBack} isAuthenticated={this.props.auth.isAuthenticated} addError={this.props.addError} isDark={this.state.isDark} />} />
                                <Route path="/aboutus" component={() => <About leaders={this.props.leaders.leaders} leadersLoading={this.props.leaders.isLoading} leadersErrMess={this.props.leaders.errMess} isDark={this.state.isDark} />} />
                                <Route path="/login" component={() => <Login isAuthenticated={this.props.auth.isAuthenticated} errMess={this.props.auth.errMess} loginUser={this.props.loginUser} isDark={this.state.isDark} />} />
                                <Route path="/signup" render={() => <SignUp isAuthenticated={this.props.auth.isAuthenticated} isLoading={this.props.username.isLoading} signUp={this.props.signUp} fetchUsers={this.props.fetchUsers} exists={this.props.username.exists} isDark={this.state.isDark} />} />
                                <Redirect to="/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                    <Footer isDark={this.state.isDark} />
                </div>
            </HashRouter>
        );
    }

}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Main));