import React, { Component } from 'react';
import ProductDetail from './ProductDetail.jsx'

export default class ProductThumbnail extends React.Component {
    constructor(){
        super()
        this.state=({selected:''})
    }
    viewDetail(id){
            this.props.dispatch({type:'SELECT_PRODUCT', payload: id})
    }
  render() {
    
  
    return (
            <div>
                <div className={this.props.type}>
                    <div className="thumbnail">
                        <div className={this.props.style}>
                            <img src={this.props.product.imageUrl} className='thumbnail-img' alt={this.props.product.name}/>
                            <div className="thumbnail-text">
                        <h5>{this.props.product.name}</h5>
                    <p>
                        {this.props.product.price} VND
                        </p>
                        <p>
                            <a href="productDetail" className="btn btn-primary btn-md" onClick={this.viewDetail.bind(this, this.props.product._id)}>View Detail</a>
                        </p>
                   </div>
              </div>
                  
              </div>
          </div>
          
          
      </div>
    );
  }
}


  