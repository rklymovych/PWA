class Figure {
  constructor(width, height, classes) {
    this.width = width
    this.height = height
    this.classes = classes
  }

  insertFigure(data) {
    const { w, h, tag = 'div', classes, id, parentDiv } = data;

    const figure = document.createElement(tag);

    const parentNode = document.getElementById(parentDiv);
    figure.classList.add(classes);
    id && figure.setAttribute('id', id)
    figure.style.width = w;
    figure.style.height = h;
    parentNode.appendChild(figure);
  }
}



const circle = new Figure();
const rect = new Figure();
// circle.insertFigure({ w: '200px', h: '200px', classes: 'circle', parentDiv: 'block-1' });

// rect.insertFigure({ w: '2px', h: '598px', classes: 'stick', parentDiv: 'block-1' })


fetch('https://jsonplaceholder.typicode.com/todos?_limit=7')
  .then(response => response.json())
  .then(json => {
    console.log(json);
    const text = document.getElementById('text');

    json.map((element, i) => {
     
      const p = document.createElement('p')
      p.innerText = i + 1 + '. ' + element.title;
      text.appendChild(p)
    });
  })