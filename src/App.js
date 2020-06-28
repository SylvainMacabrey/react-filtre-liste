import React from 'react';
import './App.css';

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

function ProductRow ({ product }) {
const name = product.stocked ? product.name : <span className="text-danger">{ product.name }</span>
  return <tr>
    <td>{ name }</td>
    <td>{ product.price } </td>
  </tr>
}

function ProductCategoryRaw ({ category }) {
  return <tr>
    <th className="grey lighten-2" colSpan="2">{ category }</th>
  </tr>
}

function ProductTable ({ products, inStockOnly, filterText }) {
  const rows = []
  let lastCategory = null
  products.forEach(product => {
    if((inStockOnly && !product.stocked) || (product.name.toLowerCase().indexOf(filterText) === -1)) return
    if(product.category !== lastCategory) {
      lastCategory = product.category
      rows.push(<ProductCategoryRaw key={ lastCategory } category={ lastCategory }/>)
    }
    rows.push(<ProductRow key={ product.name } product={ product }/>)
  })
  return <table className="table">
    <thead className="blue white-text">
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Prix</th>
      </tr>
    </thead>
    <tbody>{ rows }</tbody>
  </table>
}

class SearchBar extends React.Component {

  constructor (props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterTextChange (e) {
    this.props.onFilterTextChange(e.target.value)
  }

  handleInStockChange (e) {
    this.props.onStockChange(e.target.checked)
  }

  render () {
    const { filterText, inStockOnly } = this.props
    return <div>
      <form className="text-center border border-light p-5">
        <input type="text" id="search" value={ filterText } className="form-control mb-4" placeholder="Search ..." onChange={ this.handleFilterTextChange }/>
        <div className="d-flex justify-content-around">
          <div className="custom-control custom-checkbox">
              <input type="checkbox" checked={ inStockOnly } className="custom-control-input" id="stock" onChange={ this.handleInStockChange }/>
              <label className="custom-control-label" htmlFor="stock">Seulement les produits en stock</label>
          </div>
        </div>
      </form>
    </div>
  }

}

class FilterableProductTable extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
  }

  handleFilterTextChange (filterText) {
    this.setState({ filterText })
  }

  handleInStockOnlyChange (inStockOnly) {
    this.setState({ inStockOnly })
  }

  render () {
    const { products } = this.props
    return <div>
      <SearchBar 
        filterText={ this.state.filterText }
        inStockOnly={ this.state.inStockOnly }
        onFilterTextChange={ this.handleFilterTextChange }
        onStockChange={ this.handleInStockOnlyChange } 
      />
      <ProductTable
        products={ products }
        filterText={ this.state.filterText }
        inStockOnly={ this.state.inStockOnly }
      />
    </div>
  }

}

function App () {
  return (
    <div className="App">
      <FilterableProductTable products={ PRODUCTS }/>
    </div>
  );
}

export default App;
