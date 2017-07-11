
class Viz {
  constructor(data) {
    this.data = data;
    this.dataIdx = -1;
    this.clickNext = this.clickNext.bind(this);
    this.svg = d3.select("#svg");
  }

  update() {
    console.log("CHANGE");
    console.table(this.state);
    // Alright, i'll try to explain this as I go
    this.bars = this.svg.selectAll("rect")
      // each container represents an item (param 1)
      // the key for that item is the item itself (param 2)
      .data(this.state, (d) => d.value);

    // create a linear transition that lasts 200 ms
    const t = d3.transition()
      .duration(1000);

    // Let's update the bars that existed last frame, default class is just 'bar'
    this.bars.attr("class", "bar updated");

    // information entered should be given containers with bars inside
    const enters = this.bars.enter()
      .append("rect")
      .attr("class", "bar added")
      .attr("width", 50)
      .attr("height", d => (50 * d.value))
      .attr("class", d => d.isVisited ? "bar selected" : "bar")
      .attr("y", d => 500 / 2 - 50 * d.value)
      .attr("enterVal", d => d.value)
    .merge(this.bars)
      .transition(t)
      .attr("x", (d, idx) => idx * 50)
      .attr("updateVal", d => d.value);
  }

  clickNext() {
    this.dataIdx = (this.dataIdx + 1)%this.data.length;
    console.log(this.dataIdx);
    let d = this.data[this.dataIdx];
    let a = [];
    for(let i=0;i<d.length;i++)
      a.push({value: d[i]});
    this.shuffle(a);
    this.state = a;
    this.update();
  }

  shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
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





