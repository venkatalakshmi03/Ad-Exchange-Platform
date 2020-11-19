import React from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class BidOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bidAmount: 0, 
            paymentMethod: 30,
            resultMessage: '',
            resultMessageColor: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(value, property) {
        this.setState({[property]: value});
    }
    
    async handleSubmit() {
        let res = await axios({
            method: 'post',
            url: '/api/bidoffer',
            data: {
                bidAmount: this.state.bidAmount,
                paymentMethod: this.state.paymentMethod
            }
        });
        
        if (res.data.success) {
            this.setState({
                resultMessage: res.data.success,
                resultMessageColor: '#1aff1a'
            }); 
        } else if (res.data.failure) {
            this.setState({
                resultMessage: res.data.failure,
                resultMessageColor: '#ff1a1a'
            });
        }
    }
    
    render() {
        return (
            <div>
                <h2>Bid Offer</h2>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Publisher_ID</th>
                      <th>Slot_ID</th>
                      <th>Auction_ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1003</td>
                      <td>12</td>
                      <td>101</td>
                    </tr>
                  </tbody>
                </Table>
            
             
                  <Form.Group controlId="formBasicBidOffer">
                    <Form.Label>Enter Bid Amount</Form.Label>
                    <Form.Control name="bidOffer" type="number" placeholder="Enter bid amount" value={this.state.bidAmount} 
                       onChange={(e) => this.handleChange(e.target.value, 'bidAmount')} />
                  </Form.Group>
                    
                    <div>
                        <label style={{marginRight: '1%'}}>Select Payment Method</label>
                        <select name="paymentMethods" id="paymentMethods" onChange={(e) => this.handleChange(e.target.value, 'paymentMethod')}>
                          <option value={30}>Master Credit Card</option>
                          <option value={31}>Master Debit Card</option>
                          <option value={32}>Visa Debit Card</option>
                          <option value={33}>Visa Credit Card</option>
                        </select>
                    </div>

                  <Button variant="primary" onClick={this.handleSubmit}>
                    Submit Bid
                  </Button>
           
                <h3 style={{color: this.state.resultMessageColor, marginTop: '3%'}}>{this.state.resultMessage}</h3>
            </div>
        );
    }
}

export default BidOffer;