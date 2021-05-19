'use strict';
const resultsPannelUlElem = document.getElementById('itemClicks');

const leftImageTag = document.getElementById('img1');
const middleImageTag = document.getElementById('img2');
const rightImageTag = document.getElementById('img3');
const leftPicName = document.getElementById('picNameOne');
const middlePicName = document.getElementById('picNameTwo');
const rightPicName = document.getElementById('picNameThree');

let voteCounter = 0;


let leftPic = null;
let centerPic = null;
let rightPic = null;


function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0;
  this.timesShown = 0;

  Product.allItems.push(this);
}


Product.allItems = [];

Product.prototype.renderItem = function(name, imageTag) {
  imageTag.src = this.imgPath;
  name.textContent = this.name;
}

function renderThreeItems(leftImage, middleImage,rightImage) {
  leftImage.renderItem(leftPicName,leftImageTag);
  middleImage.renderItem(middlePicName,middleImageTag);
  rightImage.renderItem(rightPicName,rightImageTag );

}

function pickItems() {
  // // Prevents Repeat Images
  const doNotUse = [];
  doNotUse.push(leftPic);
  doNotUse.push(centerPic);
  doNotUse.push(rightPic); 

  while(doNotUse.includes(leftPic)) {
    let leftIndex = Math.floor(Math.random() * Product.allItems.length);
    leftPic = Product.allItems[leftIndex];
  }

  doNotUse.push(leftPic);

  while(doNotUse.includes(rightPic)) {
    let rightIndex = Math.floor(Math.random() * Product.allItems.length);
    rightPic = Product.allItems[rightIndex];
  } 

  doNotUse.push(rightPic);

  while(doNotUse.includes(centerPic)) {
    let middleIndex = Math.floor(Math.random() * Product.allItems.length);
    centerPic = Product.allItems[middleIndex];
  }
}
// function pickItems() {
//   const leftImgIndex = Math.floor(Math.random() * Product.allItems.length);

//   let middleImgIndex;
//   let rightImgIndex;
  
//   while (middleImgIndex === undefined || middleImgIndex === leftImgIndex) {
//     middleImgIndex = Math.floor(Math.random() * Product.allItems.length);
//   }
  
//   while (rightImgIndex === undefined || rightImgIndex === leftImgIndex || rightImgIndex === middleImgIndex) {
//     rightImgIndex = Math.floor(Math.random() * Product.allItems.length);
//   }
//   leftPic = Product.allItems[leftImgIndex];
//   centerPic = Product.allItems[middleImgIndex];
//   rightPic = Product.allItems[rightImgIndex];
// }

function renderResults() {
  resultsPannelUlElem.innerHTML = '';
  const h2Elem = document.createElement('h2');
  h2Elem.textContent = 'Items Picked';
  resultsPannelUlElem.appendChild(h2Elem);

  for (let item of Product.allItems) {
    const liElm = document.createElement('li');
    liElm.textContent = `${item.name} : ${item.votes} vote(s) & shown ${item.timesShown} times `;
    resultsPannelUlElem.appendChild(liElm);
  }
}

function handleClick(e) {
  console.log('Hello, I am Listening');
  let thingTheyClickedOn = e.target;
  console.log(thingTheyClickedOn, leftImageTag.children);

  if (voteCounter < 25) {
    if (thingTheyClickedOn === leftImageTag || thingTheyClickedOn === middleImageTag || thingTheyClickedOn === rightImageTag) {
     
      
      console.log("we made it")
     
      if (thingTheyClickedOn === leftImageTag) {
        leftPic.votes++;
      
      } else if (thingTheyClickedOn === middleImageTag) {
        centerPic.votes++;
     
      } else if(thingTheyClickedOn===rightImageTag){
        rightPic.votes++;
      }
      leftPic.timesShown++;
      centerPic.timesShown++;
      rightPic.timesShown++;
      voteCounter++;
   storeLocalData();
      pickItems();
      console.log(leftPic);
      renderThreeItems(leftPic, centerPic, rightPic);
    } 

  } else {
    leftImageTag.removeEventListener('click', handleClick);
    middleImageTag.removeEventListener('click', handleClick);
    rightImageTag.removeEventListener('click', handleClick);
    renderResults();
    callChart();
  }

}
function storeLocalData (){
  console.log(Product.allItems);
  const stringifiedObjects = JSON.stringify(Product.allItems);
  localStorage.setItem('products', stringifiedObjects);
}

function getLocalData(){
  let productsFromStorage = localStorage.getItem('products');

  if(productsFromStorage){
    let parsedProducts = JSON.parse(productsFromStorage);
  
  for (let products of parsedProducts){

    let myItem = new Product(products.name, products.imgPath);
    myItem.votes = products.votes;
    myItem.timesShown = products.timesShown;
  }
 
 
  }
    else{
      console.log(Product.allItems);
      makeItem();
    }
  }
// Event Listener
leftImageTag.addEventListener('click', handleClick);
middleImageTag.addEventListener('click', handleClick);
rightImageTag.addEventListener('click', handleClick);

function makeItem(){ 
  
new Product('Starwars Bag', './imgs/bag.jpg');
new Product('Banana Slicer', './imgs/banana.jpg');
new Product('Toilet Tablet','./imgs/bathroom.jpg');
new Product('Boots','./imgs/boots.jpg');
new Product('Breakfast Maker', './imgs/breakfast.jpg');
new Product('Meatball Bubble Gum', './imgs/bubblegum.jpg');
new Product('Camel Chair', './imgs/chair.jpg');
new Product('Cthulhu', './imgs/cthulhu.jpg');
new Product('Duck Muzzle', './imgs/dog-duck.jpg');
new Product('Dragon Meat', './imgs/dragon.jpg');
new Product('Utencil Pen', './imgs/pen.jpg');
new Product('Pet Mop', './imgs/pet-sweep.jpg');
new Product('Pizza Scissors', './imgs/scissors.jpg');
new Product('Shark Sleeping Bag', './imgs/shark.jpg');
new Product('Baby Mop', './imgs/sweep.png');
new Product('Goat Sleeping Bag', './imgs/tauntaun.jpg');
new Product('Unicorn Meat', './imgs/unicorn.jpg');
new Product('Reverse Watering Can', './imgs/water-can.jpg');
new Product('Wine Glass', './imgs/wine-glass.jpg');

}  




// Calling the Functions

getLocalData();
pickItems();
renderThreeItems(leftPic, centerPic, rightPic);

var ctx = document.getElementById('chart').getContext('2d');



var nameArray = [];
var voteArray = [];


console.log(voteArray);
function callChart(){
  for (let item of Product.allItems) {

    nameArray.push(item.name);
    voteArray.push(item.votes);
    
    
  }
var myChart = new Chart(ctx, {
  
    type: 'bar',
    data: {
      labels: nameArray,
        datasets: [{
            label: '# of Votes',
            data: voteArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
