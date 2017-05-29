import SortView from '../../views/sort_view';
import Vector from '../../utils/vector';
import CommonController from '../common_controller';

const GRID = new Vector(50,10);
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

  update() {
    // Alright, i'll try to explain this as I go
    // select all the 'g' containers w/i the HTML5 svg
    const bars = this.canvas.selectAll("rect")
      // each container represents an item (param 1)
      // the key for that item is the item itself (param 2)
      .data(this.sorter.array, d => d.value);

    // create a linear transition that lasts 200 ms
    const t = d3.transition()
      .duration(200);


    bars.exit().remove();


    // Let's update the bars that existed last frame, default class is just 'bar'
    bars.attr("class", "bar updated")

    // go through each item in the array, use ES5 function to get 'this' element
    bars.each(function(d) {
      if(d.isVisited) // if bar is visited, then class it
        d3.select(this).attr("class", "bar selected");
    });

    // information entered should be given containers with bars inside
    const enters = bars.enter()
      .append("rect")
      .attr("class", "bar added")
      .attr("width", GRID.x)
      .attr("height", d => GRID.y * d.value)
      .attr("y", d => this.height/2 - GRID.y * d.value);

    enters.merge(bars) // The merge function applies to both existing and entering bars
      .attr("x", (d, idx) => idx * GRID.x)
      .transition(t);
  }

  buttonClick(e) {
    const clicked = e.currentTarget;
    if(clicked === this.view.shuffleBtn) {
      this.sorter.shuffle();
      alertify.log("shuffled");
    } else if(clicked == this.view.sortBtn) {
      this.sorter.sort();
      alertify.success("sorted");
    }
    // Bar Reset
    this.timeline.value = 0;
    this.update();
  }

  unload() {

  }
}
export default SortController;
