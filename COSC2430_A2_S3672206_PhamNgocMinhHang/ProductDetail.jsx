import React from 'react'

export default class ProductDetail extends React.Component{
    constructor(){
        super()
        this.state=({id:''})
    }
    componentWillReceiveProps(loadProduct){
        this.setState({id: loadProduct.selectedProduct.id})
    }
    loadProduct(id){
        fetch(`http://rmit.chickenkiller.com:8080/products/`+id)
        .then(res=> res.json())
        .then(product=>this.props.dispatch({type: 'FETCH_PRODUCT', payload: product}))
        .then(console.log(this.state.id))
    }
    componentDidMount(){
        this.loadProduct(this.state.id)
    }
 
    render(){
        return(
            <div>
                
                <div className="container">
                <h1>Product Detail</h1>
                    {/* <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            {this.props.product.imageUrl}
                        </div>
                        
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <h4>
                            <li>Product name: {this.props.product.name} </li>
                            <li>Product price: {this.props.product.price}</li>
                            <li>Product type: {this.props.product.productType}</li>
                            <li>product brand: {this.props.product.brand}</li>
                            <li>Producer: {this.props.product.producer} </li>
                            <li>Description: {this.props.product.description}</li>
                        </h4>
                        </div>
                        
                    </div> */}
                </div>
                
            </div>
        )
    }
}