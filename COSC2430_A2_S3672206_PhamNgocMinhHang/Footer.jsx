import React, { Component } from 'react';


export default class Footer extends React.Component {
  render() {
      
    return (
      <div className='isfooter'>
          
          <div className="container-fluid bg-4" >
            <div className="row">
      
                <div className="col-md-4">
                    <h4>Copyright</h4>
                    <p>All Rights Reserved © 2018</p>
                </div>
                
                <div className="col-md-4">
                    <h4>Contact Info</h4>
                    <p>Address:123</p>
                    <p>Phone number:01234</p>
                    <p>Email: flowershop@gmail.com</p>
                </div>
            </div>
      </div>
          
      </div>
    );
  }
}



