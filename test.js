
class Viz {
  constructor(data) {
    this.data = data;
    this.dataIdx = 0;
    this.clickNext = this.clickNext.bind(this);
    this.svg = document.getElementById("svg");
    this.update(this.data[this.dataIdx]);
  }

  update(data) {
    
  }

  clickNext() {
    this.dataIdx = (this.dataIdx + 1)%this.data.length;
    console.log(this.dataIdx);
  }

  
}


const dataMe = [
  [1,2,3,4,5],
  [5,1,2,3,4],
  [4,5,1,2,3],
  [3,4,5,1,2],
  [2,3,4,5,1],
];

const viz = new Viz(dataMe);
document.getElementById("next").addEventListener("click", viz.clickNext);





