import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AdvertiserSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            advertiserName: '',
            adCreativeDescription: '',
            adBudget: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(value, property) {
        this.setState({[property]: value});
    }
    
    render() {
        return (
            <div>
                <h2>Advertiser Sign Up!</h2>
                <Form action="/api/adsignup" method="post">
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" type="firstName" placeholder="Enter first name" value={this.state.firstName} 
                       onChange={(e) => this.handleChange(e.target.value, 'firstName')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" type="lastName" placeholder="Enter last name" value={this.state.lastName} 
                       onChange={(e) => this.handleChange(e.target.value, 'lastName')} />
                  </Form.Group>
                
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} 
                       onChange={(e) => this.handleChange(e.target.value, 'email')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter password" value={this.state.password}
                       onChange={(e) => this.handleChange(e.target.value, 'password')} />
                  </Form.Group>
                  
                  <Form.Group controlId="formBasicAdvertiserName">
                    <Form.Label>Advertiser Name</Form.Label>
                    <Form.Control name="advertiserName" type="text" placeholder="Enter advertiser name" value={this.state.advertiserName}
                       onChange={(e) => this.handleChange(e.target.value, 'advertiserName')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicAdCreativeDescription">
                    <Form.Label>Ad Creative Description</Form.Label>
                    <Form.Control name="adDescription" type="text" placeholder="Enter ad creative description" value={this.state.adCreativeDescription}
                       onChange={(e) => this.handleChange(e.target.value, 'adCreativeDescription')} />
                  </Form.Group>  

                  <Form.Group controlId="formBasicBudgetedCost">
                    <Form.Label>Ad Creative Description</Form.Label>
                    <Form.Control name="adBudget" type="text" placeholder="Enter budget" value={this.state.adBudget}
                       onChange={(e) => this.handleChange(e.target.value, 'adBudget')} />
                  </Form.Group>  

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </div>
        );
    }
}

export default AdvertiserSignUp;