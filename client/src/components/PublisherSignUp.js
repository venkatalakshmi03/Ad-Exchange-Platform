import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class PublisherSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            publisherName: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(value, property) {
        this.setState({[property]: value});
    }
    
    render() {
        return (
            <div>
                <h2>Publisher Sign Up!</h2>
                <Form action="/api/pubsignup" method="post">
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
                  
                  <Form.Group controlId="formBasicPublisherName">
                    <Form.Label>Publisher Name</Form.Label>
                    <Form.Control name="publisherName" type="text" placeholder="Enter publisher name" value={this.state.publisherName}
                       onChange={(e) => this.handleChange(e.target.value, 'publisherName')} />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </div>
        );
    }
}

export default PublisherSignUp;