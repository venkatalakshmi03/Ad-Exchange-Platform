import React from 'react';

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
                <h1>This is the login page!</h1>
                <form action="/login" method="post">
                    <label>
                      Email:
                      <input type="text" name="email" value={this.state.email} onChange={(e) => this.handleChange(e.target.value, 'email')} />
                    </label>
                    <label>
                      Password:
                      <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e.target.value, 'password')} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Login;