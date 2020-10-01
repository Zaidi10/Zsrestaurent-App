import React, { Component, useRef } from 'react'
import {
    Card, CardImg, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import ModeButton from "./ModeButton"



function RenderCard({ item, isLoading, errMess, isDark, extra }) {
    const ele = useRef(null);

    const handelClick = () => {
        let element = ele.current;
        element.style.overflow = "visible";
        element.style.maxHeight = "unset";
        element.style.display = "block"
    }

    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else {
        return (

            <Card className={`menu_items ${isDark ? "items-back-color" + extra : "items-back-color-light" + extra}`}>
                <CardImg className="item-image" width="254" height="254" src={baseUrl + item.image} alt={item.name} />
                <CardBody className="items-details">
                    <CardTitle className="item_name">
                        {item.name}
                    </CardTitle>
                    {item.designation ? <CardSubtitle className="item_name">{item.designation}</CardSubtitle> : null}
                    <div ref={ele} onClick={handelClick} className="item_description">{item.description}</div>
                </CardBody>
            </Card>

        );
    }

}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extra: ""
        }
    }

    componentDidUpdate() {

        if (this.state.extra !== "") {
            setTimeout(() => {
                this.setState({ extra: "" });
                this.myVar = null;
            }, 4000);
        }
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (this.props.isDark !== prevProps.isDark) {
            this.setState({ extra: "-home" });
        }
    }



    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.isDark !== nextProps.isDark) {
    //         this.setState({ extra: "-home" });
    //     }
    //     return true;
    // }

    render() {
        return (
            <div>
                <div className={`container-fluid menu_container ${this.props.isDark ? "font-color back-color" + this.state.extra : "font-color-light back-color-light" + this.state.extra}`}>
                    <div className="row">
                        <div className="col-12 menu_head_col">
                            <h3>Home <ModeButton extra={this.state.extra} onClick={this.handleClick} handleModeChange={this.props.handleModeChange} isDark={this.props.isDark} /> </h3>

                            <hr className="hr_" />
                        </div>
                    </div>
                    <div className="row align-items-start">
                        <div className="col-12 col-md m-1 menu_col large">
                            <RenderCard item={this.props.dish} isDark={this.props.isDark} extra={this.state.extra} isLoading={this.props.dishesLoading} errMess={this.props.disherrMess} />
                        </div>
                        <div className="col-12 col-md m-1 menu_col large">
                            <RenderCard item={this.props.promotion} isDark={this.props.isDark} extra={this.state.extra} isLoading={this.props.promoLoading} errMess={this.props.promoErrMess} />
                        </div>
                        <div className="col-12 col-md m-1 menu_col large">
                            <RenderCard item={this.props.leader} isDark={this.props.isDark} extra={this.state.extra} isLoading={this.props.leadersLoading} errMess={this.props.leadersErrMess} />
                        </div>

                    </div>
                </div>


            </div>
        )
    }
}
