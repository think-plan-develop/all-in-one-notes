const prices = [7, 1, 5, 3, 6, 4];

// Write your solution here

function maxProfit(prices){
      let min=-Infinity;
      let buy=prices[0];
      let maxProfit=0;
      for(let i=1;i<prices.length;i++){
          if(prices[i]-buy>min){
              min=prices[i]-buy;
              buy=prices[i];

          }
      }
      console.log("buy",buy,maxProfit)
}



const result=maxProfit(prices);
console.log("result",result);