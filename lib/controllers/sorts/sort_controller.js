/* globals alertify, d3 */
import SortView from '../../views/sort_view';
import Vector from '../../utils/vector';
import CommonController from '../common_controller';

const GRID = new Vector(30,20);
let temp = 0;
class SortController extends CommonController{
  constructor(main) {
    super(main);
    this.buttonClick = this.buttonClick.bind(this);
  }

  load(element) {
    this.state = this.algorithm.array;
    this.update();
    this.view = new SortView(element);
    this.view.shuffleBtn.addEventListener("click", this.buttonClick);
    this.view.sortBtn.addEventListener("click", this.buttonClick);
    super.load(element);
  }

  unload() {
    // Remove all rectangles on unloading
    this.canvas.selectAll("rect").remove();
    super.unload();
  }

  update() {
    if(this.lastCanvas !== this.canvas)
      console.log("CANVAS CHANGED");
    this.lastCanvas = this.canvas;

    console.log("CHANGE");
    console.log(this.state);
    // Alright, i'll try to explain this as I go
    this.bars = this.canvas.selectAll("rect")
      // each container represents an item (param 1)
      // the key for that item is the item itself (param 2)
      .data(this.state, function(d, a, b) {
        console.log(d, a, b);
        return d.value;
      });

    // create a linear transition that lasts 200 ms
    const t = d3.transition()
      .duration(1000);

    bars.exit().remove();

    // Let's update the bars that existed last frame, default class is just 'bar'
    bars.attr("class", "bar updated");

    // go through each item in the array, use ES5 function to get 'this' element
    bars.each(function(d) {
      if (d.isVisited)  { // if bar is visited, then class it
        d3.select(this).attr("class", "bar selected");
      }
    });

    // The merge function applies to both existing and entering bars

    // information entered should be given containers with bars inside
    const enters = bars.enter()
      .append("rect")
      .attr("class", "bar added")
      .attr("width", GRID.x)
      .attr("height", d => (GRID.y * d.value))
      .attr("class", d => d.isVisited ? "bar selected" : "bar")
      .attr("y", d => this.height / 2 - GRID.y * d.value)
      .attr("enterVal", d => d.value)
    .merge(bars)
      .transition(t)
      .attr("x", (d, idx) => {
        // console.log("DATA: " + d.value + ", X:" + idx * GRID.x);
        // console.log(d);
        return idx * GRID.x;
      })
      .attr("updateVal", d => d.value);
  }

  buttonClick(e) {
    const clicked = e.currentTarget;
    if(clicked === this.view.shuffleBtn) {
      this.algorithm.shuffle();
      // alertify.log("shuffled");
      this.disableTimeline();
    } else if(clicked == this.view.sortBtn) {
      this.algorithm.sort();
      // alertify.success("sorted");
      this.enableTimeline();
    }
    this.update();
  }
}
export default SortController;
