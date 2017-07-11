/// Pseudo-anonymous class. All empty functions inside this class must be
/// overloaded in their sub-classes.
const MAX = 8;
const MIN = .4;
class CommonController {
  constructor(main) {
    this.main = main;

    this.svg = d3.select("svg");
    this.canvas = this.svg.select("g");
    this.zoom = d3.zoom()
      .scaleExtent([MIN, MAX])
      .on("zoom", this.zoomed.bind(this));
    this.resize();
    this.timeline = document.getElementById("timeline");
    this.interpolate = this.interpolate.bind(this);
  }

  load(element) {
    this.resize();
    this.timeline.addEventListener("change", this.interpolate);
    this.timeline.addEventListener("input", this.interpolate);
    this.disableTimeline();
  }

  unload() {
    this.timeline.removeEventListener("change", this.interpolate);
    this.timeline.removeEventListener("input", this.interpolate);
  }

  enableTimeline() {
    this.timeline.disabled = false;
    this.timeline.value = 0;
    this.interpolate();
  }

  disableTimeline() {
    this.timeline.disabled = true;
  }

  interpolate() {
    const percent = Math.min(this.timeline.value/100, .99);
    const visual = this.algorithm.states;
    const nextState = visual[Math.floor(percent*visual.length)];
    if(this.state !== nextState) {
      this.state = nextState;
      this.update();
      this.zoomFit();
    }
    // const nextState = visual[];
    // if(this.state !== nextState) {
    //   console.log(this.state);
    //   this.zoomFit();
    //   this.update();
    // }
  }

  /// updates D3 Control
  /// always override this method
  update() {}


  zoomFit(paddingPercent = .9, transitionDuration = 750) {
    const bbox = this.canvas.node().getBBox();
    var dx = bbox.width,
        dy = bbox.height,
        x = bbox.x + bbox.width / 2,
        y = bbox.y + bbox.height / 2,
        scale = Math.max(MIN, Math.min(MAX, paddingPercent / Math.max(dx / this.width, dy / this.height))),
        translate = [this.width / 2 - scale * x, this.height / 2 - scale * y];
    this.svg.transition()
      .duration(transitionDuration)
      .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1])
      .scale(scale));
  }

  zoomed() {
    this.canvas.attr("transform", d3.event.transform);
  }

  resize() {
    this.width = this.svg.attr("width");
    this.height = this.svg.attr("height");
    this.zoomFit();
  }
}
export default CommonController;
