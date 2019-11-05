import React from 'react'
import ProductThumbnail from './ProductThumbnail.jsx';


export default class List extends React.Component{

    constructor(){
        super()
        this.state = ({
            type:'col-sm-4',
            // list style
            style:'grid-thumbnail',
            keyword:'', 
            // price or product
            filterType:'',
            // select from filter categories
            filterid:'',
            // select to view detail
            selected:''
        }
    )}
    // load product after call the component
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
    loadTypes(){
        fetch(`http://rmit.chickenkiller.com:8080/productTypes`)
        .then(respon=> respon.json())
        .then(types=>this.props.dispatch({type: 'FETCH_TYPES', payload: types}))
    }
 
    viewDetail(id){
        this.props.dispatch({type:'SELECT_PRODUCT', payload: id})
    }
    
    onSearch(){
        this.setState({filterType: 'search'})
    }
    selectGrid(){
        this.setState({type: 'col-sm-4',style:'grid-thumbnail'})
    }
    selectList(){
        this.setState({type: 'col-sm-12',style:'list-thumbnail'})
    }
    onCategories(type){
        console.log(type)
        this.setState({filterType:'filterProduct',filterid: type})
    }
    priceFilter(){
        
    }

    render(){
            

            // pass props to another var to filtering
            let listOfAllProducts = this.props.products.filter(
            (s)=>{
                if(this.state.filterType==='search')
                    {return s.name.toLowerCase().indexOf(this.state.keyword.toLowerCase())!==-1}
                if(this.state.filterType==='filterProduct')
                    // {return s.productType.indexOf(this.state.keyword)!==-1 }
                    {return  s.productType.toLowerCase().indexOf(this.state.filterid.toLowerCase())!==-1}
                else 
                    return this.props.products
            }
        );
        // pass var to the child component
        let productGridList= listOfAllProducts.map(product=>
            <ProductThumbnail key ={product._id} 
            // productID ={product._id} price={product.price} name={product.name}
            // img={product.imageUrl} 
            product={product} selectedProdutc={this.props.selectedProdutc}
            type={this.state.type} style={this.state.style}/>
        );
        
        return(            
            
            <div className='container'>
            
                     
                <div className="row">
                    <div className="col-md-3">

                        <div classname='filter'>
                        <div className="panel-group" id="accordion">
                        <div className='panel panel-primary'>
                            <div className="panel-heading">Filter By</div>
                            {/* Product type categories */}
                            <div className="panel-body">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse" onClick={this.loadTypes.bind(this)}  data-parent="#accordion" href="#collapse1">Product</a>
                                </h4>
                            </div>
                            <div id="collapse1" className="panel-collapse collapse">
                                <ul className="list-group">
                                    {this.props.types.map(s=>
                                    <ul key={s._id}>
                                    <button onClick={this.onCategories.bind(this, s.name)} className="list-group-item">{s.name}</button>
                                    </ul>
                            )}
                                </ul>
                                </div>
                            {/* Price categories */}
                            <div className="panel-body">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse"  data-parent="#accordion" href="#collapse2">Price</a>
                                </h4>
                            </div>
                            
                                <div id="collapse2" className="panel-collapse collapse">
                                <ul className="list-group">
                                    <a className="list-group-item" onClick={this.priceFilter.bind(this)}> Low to High</a>
                                    <a className="list-group-item"> High to Low</a>
                                </ul>
                                </div>
                        </div>
                    </div>
                        </div>

                    </div>
                    
                    <div className="col-md-9">
                            {/* Search bar */}
                            <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <input type="text" name='keyword' className="form-control" value={this.state.keyword} 
                                    onChange={this.handleChange.bind(this)}
                                     placeholder='Enter product name' />
                                    <span className="input-group-btn">
                                    <button type='button' className="btn btn-primary" onClick={this.onSearch.bind(this)}>
                                                    <span className="glyphicon glyphicon-search"></span></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* List of the product */}
                       <div className='listTilte'>
                            <h1>List of Products</h1>  
                            
                            <button type="button" className="btn btn-default btn-sm" onClick={this.selectGrid.bind(this)}>
                            <span className="glyphicon glyphicon-th"></span> Grid 
                            </button>
                            <button type="button" className="btn btn-default btn-sm" onClick={this.selectList.bind(this)}>
                            <span className="glyphicon glyphicon-list"></span> List
                            </button>
                            <br/>
                            <br/>
                       </div>
                
                        {productGridList}
                    </div>
                    
                </div>
                
               
                
            </div>
        )
    }
}