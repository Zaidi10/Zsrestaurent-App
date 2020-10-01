import React, { useState } from 'react'
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { Loading } from "./LoadingComponent";
import CardComp from "./CardComponent";
import StripeCheckout from "react-stripe-checkout";


const sp = ({ children, ...props }) => (
    <div className="str-btn" {...props}>{children}</div>
)

function Menu(props) {


    const [modal, setModal] = useState(false);

    const makePayment = (token) => {
        props.fetchPayment(token, { productItems: props.cartItems, price: props.totalPrice + 50 + Math.round((props.totalPrice * 0.15 + Number.EPSILON) * 1) / 1 });

    }
    const onOpened = () => {

    }

    const handleCheckoutClick = () => {
        toggle();
    }

    const toggle = () => setModal(!modal);

    const handleUnautheicatedCheckout = () => {
        if (modal) {
            toggle();
        }
        props.addError();
    }

    function handleModal() {

        toggle();
    }


    const menu = props.dishes.map(dish => {

        return (
            <CardComp isDark={props.isDark} key={dish._id} dish={dish} handleAddCart={props.handleAddCart} handleRemoveCart={props.handleRemoveCart} />
        );
    })
    const cartjsx = props.cartItems.map((item) => {

        return (<ListGroupItem key={item.name} className="cart-li"><span>{item.name}  ({item.number})</span><span className="cart-price">₹ {item.price}</span></ListGroupItem>);
    })

    if (props.isLoading) {
        return (
            <div className="container-fluid menu_container back-color">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container-fluid menu_container back-color">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dishes != null) {

        return (

            <div className={`container-fluid menu_container ${props.isDark ? "font-color back-color" : "font-color-light back-color-light"}`}>
                <div className="row">
                    <div className="col-12 menu_head_col">
                        <h3 className="">Menu</h3>
                        <hr className="hr_" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8 col-ipad">
                        <div className="row">
                            {menu}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        {window.innerWidth >= 1024 ?
                            <Card className="cart-card">
                                <CardHeader className="bg-white cart-header">Cart<span><i className="fa fa-shopping-cart" aria-hidden="true"></i></span></CardHeader>
                                <CardBody className="card-bd-about cart-body">
                                    {props.cartItems.length > 0
                                        ?
                                        <div>
                                            <ListGroup className="cart-list">
                                                {cartjsx}
                                            </ListGroup>
                                            <div className="bill-con">
                                                <div className="bill-head">Bill Details</div>
                                                <div className="bil-items">Items Total <span className="cart-price">₹ {props.totalPrice}</span></div>
                                                <div className="bil-items">Delivery Charge <span className="cart-price">₹ 50</span></div>
                                                <div className="bil-items">Taxes <span className="cart-price">₹ {Math.round((props.totalPrice * 0.15 + Number.EPSILON) * 100) / 100}</span></div>
                                                <hr className="cart-hr" />
                                                <div className="to-pay">To Pay <span className="to-pay-span" >₹ {props.totalPrice + 50 + Math.round((props.totalPrice * 0.15 + Number.EPSILON) * 1) / 1}</span></div>

                                            </div>
                                            <div className="cart-button-con">
                                                {props.isAuthenticated ?
                                                    <StripeCheckout opened={onOpened} ComponentClass={sp} shippingAddress billingAddress={false} currency="INR" stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Checkout" amount={(props.totalPrice + 50 + Math.round((props.totalPrice * 0.15 + Number.EPSILON) * 1) / 1) * 100}>
                                                        <Button className="cartButtom">Checkout <i class="fa fa-long-arrow-right" aria-hidden="true"></i></Button>
                                                    </StripeCheckout>
                                                    : <Button onClick={handleUnautheicatedCheckout} className="cartButtom">Checkout <i class="fa fa-long-arrow-right" aria-hidden="true"></i></Button>
                                                }
                                            </div>

                                        </div>
                                        : <h3 className="empty-cart">Cart is Empty!</h3>
                                    }
                                </CardBody>
                            </Card>
                            :
                            <Modal isOpen={modal} toggle={toggle} >
                                <ModalHeader toggle={toggle}>Cart<span><i className="fa fa-shopping-cart" aria-hidden="true"></i></span></ModalHeader>
                                <ModalBody>
                                    {props.cartItems.length > 0
                                        ?
                                        <div>
                                            <ListGroup className="cart-list">
                                                {cartjsx}
                                            </ListGroup>
                                            <div className="bill-con">
                                                <div className="bill-head">Bill Details</div>
                                                <div className="bil-items">Items Total <span className="cart-price">₹ {props.totalPrice}</span></div>
                                                <div className="bil-items">Delivery Charge <span className="cart-price">₹ 50</span></div>
                                                <div className="bil-items">Taxes <span className="cart-price">₹ {Math.round((props.totalPrice * 0.15 + Number.EPSILON) * 100) / 100}</span></div>
                                                <hr className="cart-hr" />
                                                <div className="to-pay">To Pay <span className="to-pay-span" >₹ {props.totalPrice + 50 + Math.round((props.totalPrice * 0.15 + Number.EPSILON) * 1) / 1}</span></div>

                                            </div>


                                        </div>
                                        : <h3 className="empty-cart">Cart is Empty!</h3>
                                    }
                                </ModalBody>
                                <ModalFooter>
                                    {props.cartItems.length > 0 ?
                                        <div className="cart-button-con">
                                            {props.isAuthenticated ?
                                                <StripeCheckout opened={onOpened} ComponentClass={sp} shippingAddress billingAddress={false} currency="INR" stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Checkout" amount={(props.totalPrice + 50 + Math.round((props.totalPrice * 0.15 + Number.EPSILON) * 1) / 1) * 100}>
                                                    <Button onClick={handleCheckoutClick} className="cartButtom">Checkout <i className="fa fa-long-arrow-right" aria-hidden="true"></i></Button>
                                                </StripeCheckout>
                                                : <Button onClick={handleUnautheicatedCheckout} className="cartButtom">Checkout <i className="fa fa-long-arrow-right" aria-hidden="true"></i></Button>
                                            }
                                        </div>
                                        : ""
                                    }
                                </ModalFooter>
                            </Modal>
                        }
                    </div>
                    {window.innerWidth < 1024 ?
                        <div className="bottom-div"><button onClick={handleModal} className="mobile-cart-button"><i className="fa fa-shopping-cart" style={{ fontSize: 30 }} aria-hidden="true"></i> <span className="no-cart">{props.totalItems}</span></button></div>
                        : ""
                    }
                </div>
            </div>
        )
    }

}
export default React.memo(Menu);
