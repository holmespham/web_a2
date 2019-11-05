import React from 'react'
export default class Form extends React.Component{

    constructor(){
        super()
        this.state = {id: '',name:''}
    }
    componentWillReceiveProps(newType){
        this.setState({id: newType.editingType.id, name: newType.editingType.name,
        })
    }
    handleChange(e){
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    addType(e){
        e.preventDefault()
        var product =this.state
            fetch(`http://rmit.chickenkiller.com:8080/productTypes`, {
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
                    type:'ADD_TYPE', 
                    payload: data})
            })
            .then(alert('Added new product type'))
            .then(this.setState({
                name:''
            }))
    }
    resetForm(){
        this.setState({
            name:''
        })
    }
    render(){
        return(
            <div className='ontopform'>
                <div className="panel panel-default">
                      <div className="panel-heading">
                            <h3 className="panel-title">Product Type Information</h3>
                      </div>
                      <div className="panel-body">
                            <form onSubmit={this.addType.bind(this)} onReset={this.resetForm.bind(this)}>
                                  
                                  <div className="form-group"> 
                                  <label>Name: </label>
                                  <input type="text" name='name' className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder='Enter name'  />
                                  </div>
                                        
                                  <button type='submit' className='btn btn-primary'>Save Form</button>
          
                                  <button type='reset'  className='btn btn-danger' >Clear Form</button>
                          </form>
                      </div>
                      </div>
                </div>
                
                
                
            
        )
    }
}


