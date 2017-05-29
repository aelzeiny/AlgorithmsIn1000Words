/* globals alertify, d3 */
import SortView from '../../views/sort_view';
import Vector from '../../utils/vector';
import CommonController from '../common_controller';

const GRID = new Vector(30,20);
class SortController extends CommonController{
  constructor(main) {
    super(main);
    this.buttonClick = this.buttonClick.bind(this);
  }

  load(element) {
    this.update();
    this.view = new SortView(element);
    this.view.shuffleBtn.addEventListener("click", this.buttonClick);
    this.view.sortBtn.addEventListener("click", this.buttonClick);
    super.load(element);
  }

  update(state) {
    // Alright, i'll try to explain this as I go
    const bars = this.canvas.selectAll("rect")
      .data(state ? state : this.sorter.array, d => d);

    // create a linear transition that lasts 200 ms
    const t = d3.transition()
      .duration(10);

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
    bars
      .transition(t)
      .attr("x", (d, idx) => idx * GRID.x);

    // information entered should be given containers with bars inside
    const enters = bars.enter()
      .append("rect")
      .attr("class", "bar added")
      .attr("width", GRID.x)
      .attr("height", d => (GRID.y * d.value))
      .attr("class", d => d.isVisited ? "bar selected" : "bar")
      .attr("y", d => this.height / 2 - GRID.y * d.value)
      .attr("x", (d, idx) => idx * GRID.x);
  }

  buttonClick(e) {
    const clicked = e.currentTarget;
    if(clicked === this.view.shuffleBtn) {
      this.sorter.shuffle();
      // alertify.log("shuffled");
      this.update();
    } else if(clicked === this.view.sortBtn) {
      this.sorter.sort();
      // alertify.success("sorted");

      let i = 0;
      const interval = setInterval(() => {
        this.update(this.sorter.states[i]);
        i++;
        if (i === this.sorter.states.length) {
          clearInterval(interval);
        }
      }, 10);
    }
    // Bar Reset
    this.timeline.value = 0;
  }

  unload() {
    // Remove all rectangles on unloading
    this.canvas.selectAll("rect").remove();
    super.unload();
  }
}
export default SortController;
