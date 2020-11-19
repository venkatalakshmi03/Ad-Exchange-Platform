import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // gives ability to call action creators
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import AdvertiserSignUp from './AdvertiserSignUp';
import PublisherSignUp from './PublisherSignUp';

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    
    render() {
        return (
            <div className = "container">
                <Header />
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Landing} />
                        <Route path="/login" component={Login} />
                        <Route path="/adsignup" component={AdvertiserSignUp} />
                        <Route path="/pubsignup" component={PublisherSignUp} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);