class Model {
  constructor() {

    //Cat array, ad as many as you like
    this.cats = [
      {
        name: 'Sasa',
        clickcount: 0,
        catImage: 'img/hero-cat.png'
      },{
        name: 'Simba',
        clickcount: 0,
        catImage: 'img/hero-cat.png'
      },{
        name: 'Leon',
        clickcount: 0,
        catImage: 'img/hero-cat.png'
      },{
        name: 'Luke',
        clickcount: 0,
        catImage: 'img/hero-cat.png'
      },{
        name: 'Leia',
        clickcount: 0,
        catImage: 'img/hero-cat.png'
      },{
        name: 'Garfield',
        clickcount: 0,
        catImage: 'img/hero-cat.png'
      }
    ];
  }

  //Updates the clickcount and returns the new clickcount
  updateCounter() {
    const cat = document.querySelector('p').textContent;
    let catObject = this.cats.find(obj => obj.name === cat);
    catObject.clickcount++

    return catObject.clickcount;
  }
}

//Controller
class Octopuss {
  constructor(model, view, menueView, catView) {
    this.model = model;
    this.view = view;
    this.menueView = menueView;
    this.catView = catView;
  }

  //Handles all Clicks
  clickHandler(evt) {

    if(evt.target.tagName == 'BUTTON') {
      const catName = evt.target.textContent;
      let catObject = octopuss.model.cats.find(obj => obj.name === catName);
      octopuss.catView.removeCat();

      const newElem = octopuss.catView.createCat(catObject);

      octopuss.catView.addToDom(newElem, 'main');
    }

    if(evt.target.tagName == 'IMG') {
      const newClickCount = octopuss.model.updateCounter();
      octopuss.catView.increaseCount(newClickCount);
    }
  }

  //Init the basic rendering. Add all buttons and the first cat
  init() {
    let that = this

    for(let obj of this.model.cats) {
      const newButton = that.menueView.createButton(obj);
      that.view.addToDom(newButton, 'nav');
    }

    const firstCat = this.model.cats[0];
    const firstCatElem = this.catView.createCat(firstCat);

    this.view.addToDom(firstCatElem, 'main');
  }
}

//Generel view class
class View {
  addToDom(elem, parent) {
    document.querySelector(parent).appendChild(elem);
  }
}

//Class for the menue, subclass of view
class MenueView extends View {

  //Create a new button and return the element node
  createButton(obj) {
    const newButton = document.createElement('button');
    newButton.textContent = obj.name;

    return newButton;
  }
}

//Class for the cat view content, subclass of view
class CatView extends View {

  //Create a new cat element and return the element node
  createCat(obj) {
    const wrapper = document.createElement('div');
    const label = document.createElement('p');
    const img = document.createElement('img');
    const clickCount = document.createElement('p');

    wrapper.classList.add('cat-wrapper');
    clickCount.classList.add('counter');
    label.textContent = obj.name;
    img.setAttribute('src', obj.catImage);
    clickCount.textContent = `Cat has been clicked ${obj.clickcount} times!`;

    wrapper.append(label, img, clickCount);

    return wrapper;
  }

  // Render new click count
  increaseCount(clickCount) {
    const clickCountElem = document.querySelector('.counter');
    clickCountElem.textContent = `Cat has been clicked ${clickCount} times!`;
  }

  //Remove an cat element
  removeCat() {
    document.querySelector('.cat-wrapper').remove();
  }
}

//Start everything
const model = new Model();
const view = new View();
const menueView = new MenueView();
const catView = new CatView();

const octopuss = new Octopuss(model, view, menueView, catView);

octopuss.init();

document.querySelector('body').addEventListener('click', octopuss.clickHandler);
