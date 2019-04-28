import _ from 'lodash';
const HISTORY_SIZE = 10;
const  stockAppUtil = {
	
	createFlatArrayOfdata : (data)=>{
  	
	  let retData = null;

	  if(!_.isEmpty(data)) {
	    retData = Object.keys(data).map((item,index) => {
	      let thisItem = data[item];
	      return {
	        name: item,
	        ...thisItem
	      }
	    });

	    return retData;
	   }
    },

	createDataMap : (hash,data)=> {
	  	if(data && data.length > 0) {
		    data.map(([name, price], index) => {
		      let stHash = hash[name] || {};
		      let history = stHash.history || []; 
		      stHash.status = getStatus(stHash.price, price);
		      stHash.diff = getDifference(stHash.price, price);     
		      stHash.oldPrice = stHash.price;
		      stHash.price = price;
		      stHash.updatedAt = Date.now();
		      if(history.length===HISTORY_SIZE)
		        history.shift();
		      history.push(price);
		      stHash.history = history;      
		      hash[name] = stHash;
		      return true;
		    });
	    }
    }
}

function getDifference (current,latest) {
	  return {
	    percent: ((latest-current)/latest)*100,
	    value: latest-current
	  }
	}

	function getStatus(current,latest) {
	  let status = 'default';

	  if(current && latest-current > 0)
	    status = 'up';
	  else if(current && latest-current < 0)
	    status = 'down';
	  else if(current && latest-current===0)
	    status = 'constant'

	  return status;
	}


export default stockAppUtil;