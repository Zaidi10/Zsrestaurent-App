import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent"
import DishdDetails from "./DishdetailsComponent"
import Contact from "./ContactComponent";
import About from "./AboutComponent"
import Home from "./HomeComponent";
import { connect } from "react-redux"

const mapStatetoProps = (state) => {
    return state;
}

class Main extends Component {
    constructor(props) {
        super(props);

    }
    homecomponent = () => {
        return (<Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]} />);
    }
    DishWithId = ({ match }) => {
        return (<DishdDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        />);
    }
    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/home" component={this.homecomponent} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={this.DishWithId} />
                    <Route exact path="/contactus" component={Contact} />
                    <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStatetoProps)(Main));