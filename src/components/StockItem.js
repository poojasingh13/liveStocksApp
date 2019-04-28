import React from 'react';
import moment from 'moment';

class StockItem extends React.Component {
  componentDidMount() {
    this.opacity = 1;
  }

  getDiffVal = (obj, key) => {
    if(obj) {
      let change = (obj.value < 0 ? "-" : (obj.value===0 ? "" : "+"));
      let prefix = key==='value' ? "Rs." : "";
      let suffix = key==='percent' ? "%" : "";

      return (
        <td className="stock-item-diff">          
            {change} {prefix}{Math.abs((obj[key] || 0).toFixed(2))}{suffix}          
        </td>
      );
    }

    return null;
  }

  render() {
    let stock = this.props.data;

    return (
      <tr className={`stock-item ${stock.status}`}>
      	<td className="stock-item-name">{stock.name}</td>
      	<td className = "stock-price">Rs.{stock.price}</td>
      	{this.getDiffVal(stock.diff, 'value')}
      	<td className="stock-item-updated-at">{moment(stock.updatedAt).fromNow()}</td>
      </tr>
    )
  }
}

export default StockItem;