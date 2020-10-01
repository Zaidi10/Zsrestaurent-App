import React from 'react';
import { Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function About(props) {

    const RenderLeader = (props) => {
        return (
            <Media tag="li" className="leader-item">
                <Media left middle>
                    <Media object src={baseUrl + props.leader.image} />
                </Media>
                <Media body className="ml-5">
                    <Media heading>{props.leader.name}</Media>
                    <p>{props.leader.designation}</p>
                    {props.leader.description}
                </Media>
            </Media>
        );
    };

    var leaders = "";
    if (props.isLoading) {
        leaders = (<Loading />);
    }
    else if (props.errMess) {
        leaders = (<h4>{props.errMess}</h4>)

    }
    else {

        leaders =
            <Stagger in >
                {props.leaders.map((leader) => {
                    return (
                        <Fade in>
                            <RenderLeader leader={leader} />
                        </Fade>
                    );
                })}
            </Stagger>
    }

    return (
        <div className={`container-fluid menu_container ${props.isDark ? "font-color back-color" : "font-color-light back-color-light"}`}>
            <div className="row">
                <div className="col-12 menu_head_col">
                    <h2>About Us</h2>
                    <hr className="hr_" />
                </div>
            </div>
            <div className="row info-div">
                <div className="col-12 col-md-6">
                    <h3>Our History</h3>
                    <p>Started in 2010, Z's Resturent quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-6">
                    <Card className="card-about">
                        <CardHeader className="bg-primary text-white">More About the Creater</CardHeader>
                        <CardBody className="card-bd-about">
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card className="card2-about">
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0 quote">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row leaders-con">
                <div className="col-12">
                    <h3>Corporate Leadership</h3>
                </div>
                <div className="col-12">
                    <Media list>
                        {leaders}
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    