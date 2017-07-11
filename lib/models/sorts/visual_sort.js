import VisualAlgorithm from '../visual_algorithm';

class VisualSort extends VisualAlgorithm {
  constructor(arrayLength) {
    super();
    this.array = new Array(arrayLength);
    for(let i=1;i<=this.array.length;i++)
      this.array[i-1] = this.convertElement(i);
  }

  /// An implementation of the fisher-yates shuffle
  shuffle() {
    let size = this.array.length;
    let rand;
    let temp;
    for (let i = 0; i < size; i += 1) {
      rand = Math.floor(i + Math.random() * (size - i));
      temp = this.array[rand];
      this.array[rand] = this.array[i];
      this.array[i] = temp;
    }
    this.clearStates();
  }

  // override this method if you want more data in this object
  convertElement(el) {
    return {
      value: el,
      isVisited: false
    };
  }

  // always override this
  sort(){}

  // this stores the visit in a timeline
  pushVisit(array, i, j) {
    const cloned = this.cloneState(array);
    for(let n = i; n <= j; n++) {
      cloned[n].isVisited = true;
    }
    this.pushState(cloned);
  }
}

export default VisualSort;
