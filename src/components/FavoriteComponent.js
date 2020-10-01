import React, { Component } from 'react';
import { Media, Button } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { withRouter } from 'react-router-dom'

function RenderMenuItem({ dish, deleteFavorite }) {
    return (
        <Media tag="li">

            <Media left middle>
                <Media className="media-image" style={{ height: 254, width: 254 }} object src={baseUrl + dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5 media_body">
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>

        </Media>
    );
}

class Favorites extends Component {


    // componentDidUpdate = () => {
    //     if (!this.props.isAuthenticated) {
    //         this.props.history.push("/home");
    //     }
    // }

    render() {
        if (this.props.favorites.isLoading) {

            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.favorites.errMess) {
            return (
                <div className={`container-fluid menu_container ${this.props.isDark ? "font-color back-color" : "font-color-light back-color-light"}`}>
                    <div className="row">
                        <h4>{this.props.favorites.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (this.props.favorites.favorites) {
            const favorites = this.props.favorites.favorites.dishes.map((dish) => {
                return (
                    <div key={dish._id} className="col-12 mt-1 mb-5">
                        <RenderMenuItem dish={dish} deleteFavorite={this.props.deleteFavorite} />
                    </div>
                );
            });

            return (
                <div className={`container-fluid menu_container ${this.props.isDark ? "font-color back-color" : "font-color-light back-color-light"}`}>
                    <div className="row">
                        <div className="col-12 menu_head_col">
                            <h3>My Favorites</h3>
                            <hr class="hr_" />
                        </div>
                    </div>
                    <div className="row">
                        <Media className="media_list" list>
                            {favorites}
                        </Media>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={`container-fluid menu_container ${this.props.isDark ? "font-color back-color" : "font-color-light back-color-light"}`}>
                    <div className="row">
                        <div className="nofav-con">
                            <h4 className="nofav-head">You have no favorites</h4>
                        </div>

                    </div>
                </div>
            )
        }
    }
}

export default withRouter(Favorites);