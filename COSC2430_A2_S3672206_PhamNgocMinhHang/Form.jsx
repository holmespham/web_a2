import React from 'react'
export default class Form extends React.Component{

    constructor(){
        super()
        this.state = {id: '',name:'',brand: '', imageUrl: '',
        description:'',producer:'',productType:'', price: 0}
    }

    componentWillReceiveProps(newProduct){
        this.setState({id: newProduct.editingProduct.id, name: newProduct.editingProduct.name,
        brand: newProduct.editingProduct.brand, imageUrl: newProduct.editingProduct.imageUrl, 
        description: newProduct.editingProduct.description, producer: newProduct.editingProduct.producer,
        productType: newProduct.editingProduct.productType, price: newProduct.editingProduct.price})
    }

    handleChange(e){
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    
  
    addProduct(e){
        e.preventDefault()
        var product =this.state
            fetch(`http://rmit.chickenkiller.com:8080/products`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                method: 'post', 
                body: JSON.stringify(product)
            })
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                this.props.dispatch({
                    type:'ADD_PRODUCT', 
                    payload: data})
            })
            .then(alert('Added new product'))
    }
    resetForm(){
        this.setState({
            name:'',brand: '', imageUrl: '',
            description:'',producer:'',productType:'', price: 0
        })
    }
    render(){
        return(
            <div>
                <div className="panel panel-default">
                      <div className="panel-heading">
                            <h3 className="panel-title">Product Information</h3>
                      </div>
                      <div className="panel-body">
                            <form onSubmit={this.addProduct.bind(this)} onReset={this.resetForm.bind(this)}>
                                  
                                  <div className="form-group">
                                  <label>Name: </label>
                                  <input type="text" name='name' className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder='Enter name'  />
                                  </div>
                                  
                                  <div className="form-group">
                                  <label>Price: </label>
                                  <input type="text"  name='price' className="form-control" value={this.state.price} onChange={this.handleChange.bind(this)} placeholder='Enter price' />
                                  </div>
          
                                  <div className="form-group">
                                  <label>Brand: </label>
                                  <input type="text" name='brand' className="form-control" value={this.state.brand} onChange={this.handleChange.bind(this)} placeholder='Enter brand' />
                                  </div>
          
                                  <div className="form-group">
                                  <label>Product Type: </label>
                                  <input type="text" name='productType' className="form-control" value={this.state.productType}  onChange={this.handleChange.bind(this)} placeholder='Enter product type' />
                                  </div>
          
                                  <div className="form-group">
                                  <label>Product Image URL: </label>
                                  <input type="text" name='imageUrl' className="form-control" value={this.state.imageUrl} onChange={this.handleChange.bind(this)} placeholder='Enter image URL' />
                                  </div>
          
                                  <div className="form-group">
                                  <label>Producer: </label>
                                  <input type="text" name='producer' value={this.state.producer} className="form-control" onChange={this.handleChange.bind(this)} placeholder='Enter producer' />
                                  </div>
          
                                  <div className="form-group">
                                  <label>Description:</label>
                                  <textarea type="text" name='description' className="form-control" value={this.state.description} onChange={this.handleChange.bind(this)} placeholder='Enter description' rows ='3'/>
                                  </div>
                                        
                                  <button type='submit' className='btn btn-primary'>Save product</button>
          
                                  <button type='reset'  className='btn btn-danger' >Clear Form</button>
                          </form>
                      </div>
                      </div>
                </div>
                
                
                
            
        )
    }
}


