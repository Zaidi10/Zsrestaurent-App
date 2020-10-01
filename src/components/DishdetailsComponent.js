import React, { Component } from 'react'
import { Card, CardImg, CardImgOverlay, CardBody, CardTitle, Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from "reactstrap";
import { Control, LocalForm } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';




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
        this.handleToggle();
        this.props.postComment(this.props.dishId, values.rating, values.comment);
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleToggle}><i className="fa fa-lg fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
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

function RenderComments({ comments, dishId, postComment, isDark }) {
    let commentJsx = "";
    if (comments !== null) {

        commentJsx =
            <Stagger in >
                {comments.map(comment => {

                    /*this is to show the date in correct format as like Feb, 2012 */
                    // let date = month[comment.date.substring(5, 7) * 1] + ", " + comment.date.substring(0, 4);
                    return (
                        <Fade in key={comment._id}>
                            <li className={`${isDark ? "comment-item" : "comment-item-light"}`} key={comment._id}>
                                <p><span className="comment-author">{comment.author.firstname}</span> <span className="comment-date">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.updatedAt)))} </span></p>
                                <p>{comment.comment}</p>
                            </li>
                        </Fade>
                    );
                })}
            </Stagger>

    }

    return (<div className="col-12 col-md-12 m-1">
        <ul className="list-unstyled">
            <h4 className="">Comments</h4>
            {commentJsx}
            <CommentButton dishId={dishId} postComment={postComment} />
        </ul>
    </div>);
}
function RenderDish({ dish, favorite, postFavorite, isDark }) {
    if (dish === null) {
        return (
            ""
        );
    }
    else {
        return (
            <React.Fragment>
                <div className="col-12 col-md-7 detail-con">
                    <FadeTransform in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card className="det-card">
                            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <Button outline color="primary" onClick={() => favorite ? "" : postFavorite(dish._id)}>
                                    {favorite ?
                                        <span className="fa fa-heart"></span>
                                        :
                                        <span className="fa fa-heart-o"></span>
                                    }
                                </Button>
                            </CardImgOverlay>
                            <CardBody className={`${isDark ? "det-card-body" : "det-card-body-light"}`}>
                                <CardTitle className="det-title">{dish.name}</CardTitle>

                                <div className={`${isDark ? "det-des" : "det-des-light"}`}>
                                    {dish.description}
                                </div>
                                <div className={`row ${isDark ? "det-bottom" : "det-bottom-light"}`}>
                                    <div className={`col-4 ${isDark ? "det-b-col" : "det-b-col-light"}`}>{dish.category}</div>
                                    <div className={`col-4 ${isDark ? "det-b-col" : "det-b-col-light"}`}>{dish.price}</div>
                                    <div className={`col-4 ${isDark ? "det-b-col" : "det-b-col-light"}`}>
                                        {!dish.veg ? <img width="30" alt="non-veg" src="https://img.icons8.com/fluent/48/000000/non-vegetarian-food-symbol.png" /> : <img width="30" alt="veg" src="https://img.icons8.com/fluent/48/000000/vegetarian-food-symbol.png" />}
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            </React.Fragment>
        );
    }
}
function DishdDetails(props) {

    if (props.isLoading) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if (props.dish != null) {
        return (
            <div className={`container-fluid menu_container ${props.isDark ? "font-color back-color" : "font-color-light back-color-light"}`}>
                <div className="row">
                    <div className="col-12 menu_head_col">
                        <h3 className="">Menu</h3>
                        <hr className="hr_" />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} isDark={props.isDark} favorite={props.favorite} postFavorite={props.postFavorite} />
                    <RenderComments isDark={props.isDark} dishId={props.dish._id} postComment={props.postComment} comments={props.comments} />
                </div>
            </div>);
    }
}

export default React.memo(DishdDetails);

