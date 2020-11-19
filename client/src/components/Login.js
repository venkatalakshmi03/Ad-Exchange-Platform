import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(value, property) {
        this.setState({[property]: value});
    }
    
    render() {
        return (
            <div>
                <h2>Login</h2>
                <Form action="/auth/login" method="post">
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

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </div>
        );
    }
}

export default Login;