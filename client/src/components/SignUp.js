import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            company: '',
            targetSegment: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(value, property) {
        this.setState({[property]: value});
    }
    
    render() {
        return (
            <div>
                <h1>This is the sign up page!</h1>
                <form action="/signup" method="post">
                    <label>
                      Email:
                      <input type="text" name="email" value={this.state.email} onChange={(e) => this.handleChange(e.target.value, 'email')} />
                    </label>
                    <label>
                      Password:
                      <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e.target.value, 'password')} />
                    </label>
                    <label>
                      Company Name:
                      <input type="text" name="company" value={this.state.company} onChange={(e) => this.handleChange(e.target.value, 'company')} />
                    </label>
                    <label>
                      Target Segment:
                      <input type="text" name="targetSegment" value={this.state.targetSegment} onChange={(e) => this.handleChange(e.target.value, 'targetSegment')} />
                    </label>
                    <label for="user-type">Select User Type</label>
                    <select name="user-type" id="user-type">
                      <option value="Advertiser">Advertiser</option>
                      <option value="Publisher">Publisher</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default SignUp;