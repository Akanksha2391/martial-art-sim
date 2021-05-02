let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let bg = new Image();        
bg.src = 'background.jpg';        

let loadImage = (src,callback) => {
let img = document.createElement("img");
img.onload = () => callback(img);
img.src = src;
context.drawImage(bg, 0, 0,500,500);
};

let frame = (number,anime) =>
{
   return anime+"/"+number+".png";
}

let frames = {
   idle : [1,2,3,4,5,6,7,8],
   kick : [1,2,3,4,5,6,7],
   punch : [1,2,3,4,5,6,7],
   forward : [1,2,3,4,5,6],
   block : [1,2,3,4,5,6,7,8,9],
   backward: [1,2,3,4,5,6],
}

let loading = (callback) => {
   // let series = [1,2,3,4,5,6,7,8];
   let count = 0;
   let images= {idle : [], kick : [], punch : [], forward : [],block: [],backward : []};

   ["idle","kick","punch","forward","block","backward"].forEach((item) => {
   let animationFrames = frames[item];
   count = count + animationFrames.length;

   animationFrames.forEach((frameNo)=>{
      let path = frame(frameNo,item);
   loadImage(path,(image)=>{

      images[item][frameNo-1] = image;
      count = count -1 ;

      if (count == 0) {
         callback(images);
      }  
         });
      });    
   });   
};

let animate = (context,images,animation,x,callback)=>{
   images[animation].forEach((image,index)=>{
      setTimeout(()=>{
         if (x<=0) {
            x=0;
         }
         else if (x>=1310) {
            x=1310;
         }
      context.clearRect(x,0,500,500);
      context.drawImage(image,x,0,500,500);
   },index*100 ); 
   
   });
   
   setTimeout(callback,images[animation].length * 100);
}

loading((images) => {

   

   let queue = [];
   let moveX = 0; //movement
   let aux = () =>
   {
      if (queue.length===0)
      selected = "idle";
      else
      selected = queue.shift();

      animate(context,images,selected,moveX,aux);  
   }
   aux();

   document.getElementById("kick").onclick = () => {
      queue.push("kick");
      
   };
   document.getElementById("punch").onclick = () => {
      queue.push("punch");
      
   };
   document.getElementById("forward").onclick = () => {
      moveX = moveX + 30;
      
      queue.push("forward");
   };
   document.getElementById("backward").onclick = () => {
      moveX = moveX - 30;
      
      queue.push("backward");
   };
   document.getElementById("block").onclick = () => {
      queue.push("block");
      
   };
   
   document.addEventListener("keydown", (event) => {
         let key = event.key;

         switch(key)
         {
            case 'z' : queue.push("punch");
            
            break;
            case 'x' : queue.push("kick");
            
            break;
            case 'ArrowLeft' : queue.push("backward");
             moveX = moveX - 30;
             
            break;
            case 'ArrowRight' : queue.push("forward");
            moveX = moveX + 30;
            
            break;
            case 'ArrowDown' : queue.push("block");
            
            break;
            default: alert("Wrong Move");
            exp = exp - 1;
            progress();
            break;
         }
   });
});
   







