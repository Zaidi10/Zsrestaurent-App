import React, { useRef } from 'react'
import { Card, CardImg, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { connect } from "react-redux";

const mapStatetoProps = (state) => {
    return state.cart;
}

function CardComp({ dish, handleAddCart, handleRemoveCart, cartItems, cartIds, isDark }) {
    const ele = useRef(null);

    let index = cartIds.indexOf(dish._id);

    const handelClick = () => {
        let element = ele.current;
        element.style.overflow = "visible";
        element.style.maxHeight = "unset";
        element.style.display = "block"
    }


    return (
        <div className="col-12 col-md-6 col-lg-6 col-xl-4 menu_col">
            <Card className={`menu_items  ${isDark ? "items-back-color font-color" : "items-back-color-light font-color-light"}`} >
                <Link to={`/menu/${dish._id}`}>
                    <CardImg className="item-image" width="254" height="254" src={baseUrl + dish.image} alt={dish.name} />
                    <div className="veg-non-veg">
                        {!dish.veg ? <img width="40" alt="non-veg" src="https://img.icons8.com/fluent/48/000000/non-vegetarian-food-symbol.png" /> : <img width="40" alt="veg" src="https://img.icons8.com/fluent/48/000000/vegetarian-food-symbol.png" />}
                    </div>
                </Link>
                <div className="items-details">
                    <div className="item_name">{dish.name}</div>
                    <div ref={ele} onClick={handelClick} className="item_description">{dish.description}</div>
                    <div className="itme_rating">
                        <div className="rat_div" >
                            <i className="fa fa-star fa-1 rat_icon" aria-hidden="true" ></i>
                            <span>4.3</span>

                        </div>

                        <div className="price_div .clearfix"><span>₹ {dish.price}</span></div>
                        {index < 0 ?
                            <div className="add-con">
                                <Button className="add_button" onClick={() => { handleAddCart(dish) }}>ADD+</Button>
                            </div>
                            :
                            <div className="add-con">
                                <div className="span_con"><span className="minus" onClick={() => { handleRemoveCart(dish) }}>-</span><span className="bt-nm-cr">{cartItems[index].number}</span><span className="plus" onClick={() => { handleAddCart(dish) }}>+</span></div>
                            </div>
                        }
                    </div>
                </div>




            </Card>
        </div>
    );
}

export default React.memo(connect(mapStatetoProps)(CardComp));