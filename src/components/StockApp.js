import React from "react";
import StockItem from './StockItem';
import stockAppUtil from '../utility/stockUtil';
import _ from 'lodash';

class StockApp extends React.Component {
	constructor(){
		super();
		this.state ={
			data:[]
		};
	}
	dataHash = {};
	ws = new WebSocket("ws://stocks.mnet.website");
	renderStocksList = (stocks) => {
    if(stocks)
      return stocks.map((stock, index) => {
        return (
          <StockItem data={stock} index={index} key={`stock-item-${stock.name}`} />
        )
      });
  }
  getdata =() =>{  	 
  	this.ws.onmessage = (evt) =>{ 
  		var data = JSON.parse(evt.data);
  		stockAppUtil.createDataMap(this.dataHash,data);  		 		
        this.setState({'data': stockAppUtil.createFlatArrayOfdata(this.dataHash)});
    };               
  }
  componentDidMount() {
    this.getdata();
  }
  render() {
  	let stocks = this.state.data || [];
    return (
    	<div className="stocksApp">
    	 	<div className="stock-list-container">
    	 		<div className="stock-list-header">
    	 			<h2>All Stocks</h2>
    	 		</div>
    	 		<table className="stock-list-table">
          <thead>
    	 			<tr>
    	 				<th>Stock name</th>
    	 				<th>Price</th>
    	 				<th>Difference</th>
    	 				<th>Updated time</th>
    	 			</tr>
            </thead>
            <tbody>
    	 			{this.renderStocksList(stocks)}
            </tbody>
    	 		</table>
    	 		
    	 	</div>
    	</div>
    	);
  }
}

export default StockApp;