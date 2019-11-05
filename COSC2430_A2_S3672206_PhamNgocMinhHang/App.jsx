import React from 'react'
import {connect} from 'react-redux'
import List from './List.jsx';
import Form from './Form.jsx';
import Aboutus from './Aboutus.jsx';

import HomePage from './HomePage.jsx'
import ProductType from './ProductType.jsx'
import ProductTypeForm from './ProductTypeForm.jsx'
import ProductDetail from './ProductDetail.jsx';

class App extends React.Component{


    render() {
        let path =window.location.pathname;
      return (
        <div>

            <nav className="navbar navbar-inverse navbar-fixed-top">
                <a className="navbar-brand" href="#">Tech Shop</a>
                <ul className="nav navbar-nav">
                    <li>
                        <a href="Home">Home</a>
                    </li>
                    <li>
                        <a href="Aboutus">About</a>
                    </li>
                    <li>
                        <a href="List">Product Management</a>
                    </li>
                    <li>
                        <a href="productType">Product Type Management</a>
                    </li>
                    <li>
                        <a href='productDetail'></a>
                    </li>
                </ul>
            </nav>
            
            
            <div>
            {path.includes('Aboutus')?
              <Aboutus/>:
              <div>
            {path.includes('List')?
               <div className="container">              
                <div className="row">
                    <div className="col-md-5">
                    <Form dispatch={this.props.dispatch} editingProduct={this.props.editingProduct}/>
                    </div>
                    <div className="col-md-7">
                        <List products={this.props.products} dispatch={this.props.dispatch} 
                        editingProduct={this.props.editingProduct} selectedProduct={this.props.selectedProduct}/>
                </div>
                </div>
            </div>
           :
           <div>
               {path.includes('productType')?
               <div className="container">              
               <div className="row">
                   <div className="col-md-5">
                   <ProductTypeForm dispatch={this.props.dispatch} editingType={this.props.editingType}/>
                   </div>
                   <div className="col-md-7">
                   <ProductType dispatch={this.props.dispatch} types={this.props.types} editingType={this.props.editingType}/>
               </div>
               </div>
           </div>
               :
            <div>
                {path.includes('productDetail')?             
                <ProductDetail dispatch={this.props.dispatch} selectedProduct={this.props.selectedProduct}/>
               :
               <HomePage selectedProdutc={this.props.selectedProdutc} products={this.props.products} types={this.props.types} dispatch={this.props.dispatch}/>  
            }
           </div>
                   
            }   <div/>
            
           </div>
                   
            }   

        </div>   
          }
        </div>
            
        </div>
        
      );
    }
    
}

function mapStateToProps(centralState){
    return {
       products: centralState.products,
       editingProduct: centralState.editingProduct,
       selectedProduct: centralState.selectedProduct,
       types: centralState.types,
       editingType: centralState.editingType,


    }
}


export default connect(mapStateToProps)(App)