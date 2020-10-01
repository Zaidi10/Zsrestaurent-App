import React from 'react';
import { Link } from "react-router-dom"
function Footer(props) {
    return (
        <div className={`footer  ${props.isDark ? "footer-con font-color" : "footer-con-light font-color-light"}`}>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to='/home'>Home</Link></li>
                            <li><Link to='/aboutus'>About Us</Link></li>
                            <li><Link to='/menu'>Menu</Link></li>
                            <li><Link to='/contactus'>Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address className={`${props.isDark ? "addr" : ""}`}>
                            121, Clear Water Bay Road<br />
		              Clear Water Bay, Kowloon<br />
		              HONG KONG<br />
                            <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="zaidisuleman19@gmail.com">
                                zaidisuleman19@gmail.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">Follow us.</div>
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google btn-footer" href=""><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook btn-footer" href="https://www.facebook.com/suleman.zaidi1"><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin btn-footer" href="https://www.linkedin.com/in/suleman-zaidi"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter btn-footer" href=""><i className="fa fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center cpy-div">
                    <div className="col-auto">
                        <p>© Copyright 2020 Z's Resturent</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;