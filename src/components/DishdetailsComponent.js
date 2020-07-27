import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);


class CommentButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }
    handleToggle = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }
    submitComment = (values) => {
        alert(`Form data is ${JSON.stringify(values)}`);
        this.handleToggle();
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleToggle}><i class="fa fa-lg fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.handleToggle}>
                    <ModalHeader toggle={this.handleToggle}>Comment</ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={this.submitComment}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>

                                </Col>
                                <Col md={12}>
                                    <Control.select className="form-control" model=".rating" name="rating" id="rating" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Your Name</Label>

                                </Col>
                                <Col md={12}>
                                    <Control.text className="form-control" model=".author" name="author" id="author"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: "Must be greater then 2 characters.",
                                            maxLength: "Must be 15 characters or less."
                                        }} />
                                </Col>

                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment</Label>

                                </Col>
                                <Col md={12}>
                                    <Control.textarea rows="6" className="form-control" model=".comment" name="comment" id="comment" />
                                </Col>

                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button color="primary" type="submit">Submit</Button>
                                </Col>


                            </Row>



                        </LocalForm>


                    </ModalBody>
                </Modal>
            </div>)
    }

}

function RenderComments({ comments }) {
    let commentJsx = "";
    let month = ["none", "Jan", "Feb", "Mar", "April", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (comments !== null) {
        commentJsx = comments.map(comment => {
            /*this is to show the date in correct format as like Feb, 2012 */
            let date = month[comment.date.substring(5, 7) * 1] + ", " + comment.date.substring(0, 4);
            return (<li key={comment.id}><p>{comment.comment}</p>
                <p>--{comment.author}, {date}</p></li>);
        });
    }
    return (<div className="col-12 col-md-5 m-1">
        <ul className="list-unstyled">
            <h4>Comments</h4>
            {commentJsx}
            <CommentButton />
        </ul>
    </div>);
}
function RenderDish({ dish }) {
    if (dish === null) {
        return (
            ""
        );
    }
    else {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
function DishdDetails(props) {
    if (props.dish === null || props.dish === undefined) {
        return (<div></div>);
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem >
                            <Link to="/menu">
                                Menu
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>);
    }
}

export default DishdDetails;

