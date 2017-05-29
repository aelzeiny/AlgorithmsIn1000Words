import VisualSort from './visual_sort';

class BubbleSort extends VisualSort {
  sort() {
    const array = this.array;
    // Store array state
    this.cloneAndPushState(array);
    let temp;
    let sort = false;
    while (!sort) {
      sort = true;
      for (let i = 0; i < array.length - 1; i++) {
        // for every visit, push the visit
        this.pushVisit(array, i, i + 1);
        if (array[i].value > array[i + 1].value) {
          sort = false;
          temp = array[i].value;
          array[i].value = array[i + 1].value;
          array[i + 1].value = temp;
          // if there was a correction, push the new state
          // this.pushVisit(array, i, i + 1);
        }
      }
    }
    this.printStates();
  }

  printStates() {
    for(let i=0;i<this.states.length;i++) {
      for(let j=0;j<this.states[i].length;j++) {
        console.log(this.states[i][j]);
      }
      console.log("----");
    }
  }
}

export default BubbleSort;
