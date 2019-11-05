import React from 'react'

export default class ProductType extends React.Component{

    constructor(){
        super()
        this.state = ({
                        keyword:''}
                    )
    }
    
    componentDidMount(){
        this.loadProductTypes()
    }
    
    
    handleChange(e){
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    
    loadProductTypes(){
        fetch(`http://rmit.chickenkiller.com:8080/productTypes`)
        .then(res=> res.json())
        .then(types=>this.props.dispatch({type: 'FETCH_TYPES', payload: types}))
    }
 

    deleteType(id){
        if(confirm('Do you want to delete this product type?')){
            fetch(`http://rmit.chickenkiller.com:8080/productTypes/`+id, {
            method: 'delete'
            })
            .then((res)=>{
                return res.json()
            })
            .then(()=>{
                this.props.dispatch({type:'DELETE_TYPE', payload: id})
            })
        }
    }

    editProductType(type){
        console.log(type)
        this.props.dispatch({type:'EDIT_TYPE', payload: type})
    }

   


    onSearch(){
        console.log(listOfAllProducts)
    }

    render(){

        let listOfAllTypes = this.props.types;
        return(
            
            <div>               
                <div className='row'>
                <h1>List of Product Types</h1>
                {listOfAllTypes.map(s=>
                <div className="panel panel-default panelType" key={s._id}>
                    <div className="panel-heading"><h4>Product type: {s.name}</h4></div>
                    <div className="panel-body">ID:  {s._id} <br/>
                    <button className='btn btn-danger btn-sm' onClick={this.deleteType.bind(this, s._id)}>Delete</button>
                    <button className='btn btn-primary btn-sm' onClick={this.editProductType.bind(this, s)}>Edit</button>
                    </div>
                    
                 </div>
                )}
 
                </div>
                
            </div>
        )
    }
}