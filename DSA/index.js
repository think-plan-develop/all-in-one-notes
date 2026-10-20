const arr = [10, 20, 30, 40, 50];
const index = 2;

// Write your solution here

function deleteElement(arr,index){
    for(let i=1;i<arr.length-1;i++){
            if(i>=index){
              arr[i]=arr[i+1];
          }

        }

        return arr

}


const result=deleteElement(arr,index);
console.log("result:",result);