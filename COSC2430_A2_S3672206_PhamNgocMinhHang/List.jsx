import React from 'react'
import ProductThumbnail from './ProductThumbnail.jsx';
import ProductDetail from './ProductDetail.jsx';


export default class List extends React.Component{

    constructor(){
        super()
        this.state = ({ keyword:''})
    }
    
    componentDidMount(){
        this.loadProducts()
    }
    
    handleChange(e){
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    
    loadProducts(){
        fetch(`http://rmit.chickenkiller.com:8080/products`)
        .then(res=> res.json())
        .then(products=>this.props.dispatch({type: 'FETCH_PRODUCTS', payload: products}))
    }
 

    deleteProduct(id){
        if(confirm('Do you want to delete this product?')){
            fetch(`http://rmit.chickenkiller.com:8080/products/`+id, {
            method: 'delete'
            })
            .then((res)=>{
                return res.json()
            })
            .then(()=>{
                this.props.dispatch({type:'DELETE_PRODUCT', payload: id})
            })
        }
    }
    showProducts(){
        return(
            this.props.products.map(product=>
            <ProductThumbnail key ={product._id} price={product.price} name={product.name} img={product.imageUrl}/>
        )
        ) 
               
    }

    editProduct(product){
        console.log(product)
        this.props.dispatch({type:'EDIT_PRODUCT', payload: product})
    }


    onSearch(){
        console.log(listOfAllProducts)
    }

    render(){
        let listOfAllProducts = this.props.products.filter(
            (s)=>{
                if(s.name!==1){
                return s.name.toLowerCase().indexOf(this.state.keyword.toLowerCase())!==-1 }
                else return this.props.products
            }
        );
        return(
            
            <div>
                   
                <div className="input-group">
                <h5>Search Bar: </h5>
                <input type="text" name='keyword' className="form-control" value={this.state.keyword}
                 onChange={this.handleChange.bind(this)} placeholder='Enter product name to search' />
                    <span className="input-group-btn">
                    <button  className="btn"></button>
                    </span>
                </div>
                <h1>List of Products</h1>
                

                
                {listOfAllProducts.map(s=>
                <p key={s._id}>
                <ul> <li>Product id:  {s._id} </li>
                    <li>Product name: {s.name} </li>
                    <li>Product price: {s.price}</li>
                    <li>Product type: {s.productType}</li>
                    <li>product brand: {s.brand}</li>
                    <li>Producer: {s.producer} </li>
                    <li>Description: {s.description}</li>
                    <li>Product Image: {s.imageUrl}</li></ul>
                
                <br/> <button className='btn btn-danger btn-md' onClick={this.deleteProduct.bind(this, s._id)}>Delete</button>
                 <button className='btn btn-primary btn-md' onClick={this.editProduct.bind(this, s)}>Edit</button>
            
                
                </p>
                )}
 
            </div>
        )
    }
}