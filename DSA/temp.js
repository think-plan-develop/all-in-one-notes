

function rotateLeft(arr,k){
  let n=arr.length;
  if(n==0)return arr;
   k = k%n;

     function reverse(left, right) {
        while(left<right){
          [arr[left],arr[right]]=[arr[right],arr[left]];
          left++;
          right--;
      }
  }
  




}





console.log(rotateLeft([10, 20, 30, 40, 50, 60, 70, 80], 3));