'use strict';
const resultsPannelUlElem = document.getElementById('itemClicks');
// const itemImageSectionTag = document.getElementsByTagName('article');
const leftImageTag = document.getElementById('pic1');
const middleImageTag = document.getElementById('pic2');
const rightImageTag = document.getElementById('pic3');
const leftPicName = document.getElementById('picNameOne');
const middlePicName = document.getElementById('picNameTwo');
const rightPicName = document.getElementById('picNameThree');

let voteCounter = 0;

// come back to define current goats
let leftPic = null;
let centerPic = null;
let rightPic = null;

// goat constructor function
// names, image
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0;
  this.timesShown = 0;

  // you might not see this in production code depending on where you work but it is a handy way of getting every goat into the allGoat array every time you make one
  Product.allItems.push(this)
}

// let locations = [];
Product.allItems = [];

// make a method that renders one goat to the page
// needs to know 'this'
// needs to know where to render it h2 image tag
Product.prototype.renderItem = function(name, imageTag) {
  imageTag.src = this.imgPath;
  name.textContent = this.name;
}

// make a global function that takes two goats and calls their render method - take two goats as arguments
function renderThreeItems(leftImage, middleImage,rightImage) {
  leftImage.renderItem(leftPicName,leftImageTag );
  middleImage.renderItem(middlePicName,middleImageTag)
  rightImage.renderItem(rightPicName,rightImageTag );

}

// // build this after the pick new goats function?
// const renderNewGoats = function (leftIndex, rightIndex){
//   // we render goats based off the random goat we picked
//   leftGoatImageTag.src = GoatPicture.allImages[leftIndex].url;
//   leftGoatH2Elem.textContent = GoatPicture.allImages[leftIndex].name;
//   rightGoatImageTag.src = GoatPicture.allImages[rightIndex].url;
//   rightGoatH2Elem.textContent = GoatPicture.allImages[rightIndex].name;
// };

// pick random goats
// maybe want have those global vars that represent the current goats that we pick
// write a function that picks one goat, and then another, making sure the first and the second goat are not the same
function pickItems() {
  const leftImgIndex = Math.floor(Math.random() * Product.allItems.length);

  let middleImgIndex;
  let rightImgIndex;
  
  while (middleImgIndex === undefined || middleImgIndex === leftImgIndex || middleImgIndex === rightImgIndex) {
    middleImgIndex = Math.floor(Math.random() * Product.allItems.length);
  }
  
  while (rightImgIndex === undefined || rightImgIndex === leftImgIndex || rightImgIndex === middleImgIndex) {
    rightImgIndex = Math.floor(Math.random() * Product.allItems.length);
  }

  // lets assign the current left and current right goats based off the index numbers we got ^^^^
  leftPic = Product.allItems[leftImgIndex];
  centerPic = Product.allItems[middleImgIndex];
  rightPic = Product.allItems[rightImgIndex];
}

function renderResults() {
  resultsPannelUlElem.innerHTML = '';
  const h2Elem = document.createElement('h2');
  h2Elem.textContent = 'Items Picked';
  resultsPannelUlElem.appendChild(h2Elem);

  for (let item of Product.allItems) {
    const liElm = document.createElement('li');
    liElm.textContent = `${item.name} : ${item.votes}`;
    resultsPannelUlElem.appendChild(liElm);
  }
}
// Clicker Function
function handleClick(e) {
  console.log('Hello, I am Listening');
  let thingTheyClickedOn = e.target.id;
  console.log(thingTheyClickedOn, leftImageTag.children);

  if (voteCounter < 25) {
    if (thingTheyClickedOn === leftImageTag.children[0].id || thingTheyClickedOn === middleImageTag.id || thingTheyClickedOn === rightImageTag.id) {
      voteCounter++;
      console.log("we made it")
     
      if (thingTheyClickedOn === leftImageTag) {
        leftPic.votes++;
      
      } else if (thingTheyClickedOn === middleImageTag) {
        centerPic.votes++;
     
      } else if (thingTheyClickedOn === middleImageTag) {
        rightPic.votes++;
      }

      pickItems();
      console.log(leftPic,centerPic,rightPic);
      renderThreeItems(leftPic, centerPic, rightPic);

    }  

  } else {
    leftImageTag.removeEventListener('click', handleClick);
    renderResults();
    middleImageTag.removeEventListener('click', handleClick);
    renderResults();
    rightImageTag.removeEventListener('click', handleClick);
    renderResults();
  }

}

// Event Listener
leftImageTag.addEventListener('click', handleClick);
middleImageTag.addEventListener('click', handleClick);
rightImageTag.addEventListener('click', handleClick);

// Calling the Items
new Product('Starwars Bag', '../imgs/bag.jpg');
new Product('Banana Slicer', '../imgs/banana.jpg');
new Product('Toilet Tablet','../imgs/bathroom.jpg');
new Product('Boots','../imgs/boots.jpg');
new Product('Breakfast Maker', '../imgs/breakfast.jpg');
new Product('Meatball Bubble Gum', '../imgs/bubblegum.jpg');
new Product('Camel Chair', '../imgs/chair.jpg');
new Product('Cthulhu', '../imgs/cthulhu.jpg');
new Product('Duck Muzzle', '../imgs/dog-duck.jpg');
new Product('Dragon Meat', '../imgs/dragon.jpg');
new Product('Utencil Pen', '../imgs/pen.jpg');
new Product('Pet Mop', '../imgs/pet-sweep.jpg');
new Product('Pizza Scissors', '../imgs/scissors.jpg');
new Product('Shark Sleeping Bag', '../imgs/shark.jpg');
new Product('Baby Mop', '../imgs/sweep.png');
new Product('Goat Sleeping Bag', '../imgs/tauntaun.jpg');
new Product('Unicorn Meat', '../imgs/unicorn.jpg');
new Product('Reverse Watering Can', '../imgs/water-can.jpg');
new Product('Wine Glass', '../imgs/wine-glass.jpg');


// Calling the Functions
pickItems();
console.log(leftPic);
console.log(centerPic);
console.log(rightPic);
renderThreeItems(leftPic, centerPic, rightPic);
