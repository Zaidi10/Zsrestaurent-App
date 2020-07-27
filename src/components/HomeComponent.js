import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCard({ item }) {
    return (<Card>
        <CardImg src={item.image} alt={item.name} />
        <CardBody>
            <CardTitle>
                {item.name}
            </CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
            <CardText>{item.description}</CardText>
        </CardBody>
    </Card>);
}

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem active>
                                Home
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/Menu">
                                    Menu
                                </Link>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Home</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row align-items-start">
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.dish} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.promotion} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.leader} />
                        </div>

                    </div>
                </div>


            </div>
        )
    }
}
