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

  //Update catObject
  updateCatObject(catName, newName, newImg, newCount) {
    let catObj = this.cats.find(obj => obj.name === catName)
    console.log(catObj);
    catObj.name = newName;
    catObj.catImage = newImg;
    catObj.clickcount = newCount;

    return catObj;
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

    if(evt.target.classList.contains('cat-button')) {
      const catName = evt.target.textContent;
      let catObject = octopuss.model.cats.find(obj => obj.name === catName);
      octopuss.catView.removeCat();
      octopuss.catView.render(catObject);
    }

    if(evt.target.tagName == 'IMG') {
      const newClickCount = octopuss.model.updateCounter();
      octopuss.catView.increaseCount(newClickCount);
    }

    if(evt.target.classList.contains('admin-button')) {
      document.querySelector('form').classList.toggle('hidden');
    }

    if(evt.target.classList.contains('save')) {
      evt.preventDefault();
      const oldName = document.querySelector('p').textContent;
      const newName = document.querySelector('.input-name').value;
      const newImg = document.querySelector('.input-url').value;
      const newCount = document.querySelector('.input-counter').value;

      const newObj = octopuss.model.updateCatObject(oldName, newName, newImg, newCount);
      octopuss.menueView.reRender(octopuss.model.cats);
      octopuss.catView.removeCat();
      octopuss.catView.render(newObj);

      document.querySelector('form').classList.toggle('hidden');
    }

    if(evt.target.classList.contains('cancel')) {
      evt.preventDefault();
      document.querySelector('form').classList.toggle('hidden');
    }
  }

  //Init the basic rendering. Add all buttons and the first cat
  init() {
    this.menueView.render(this.model.cats);
    this.catView.render(this.model.cats[0]);
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
    newButton.classList.add('cat-button');

    return newButton;
  }

  reRender(objArr) {
    let buttons = document.querySelectorAll('.cat-button');
    for(let elem of buttons) {
      elem.remove();
    }
    this.render(objArr);
  }

  //Render all buttons
  render(objArr) {
    let that = this;

    for(let obj of objArr) {
      const newButton = that.createButton(obj);
      that.addToDom(newButton, 'nav');
    }
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
    document.querySelector('.input-counter').value = clickCount;
  }

  //Remove an cat element
  removeCat() {
    document.querySelector('.cat-wrapper').remove();
  }

  //Renders the cat
  render(obj) {
    const catElem = this.createCat(obj);
    this.addToDom(catElem, '.cat-view');

    document.querySelector('.input-name').value = obj.name;
    document.querySelector('.input-url').value = obj.catImage;
    document.querySelector('.input-counter').value = obj.clickcount;
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
