import merge from 'lodash/merge';

/// Visual Algorithm is kinda like a queue
/// It is responsible for displaying the algorithm's history over time
class VisualAlgorithm {
  constructor() {
    this.states = [];
  }

  pushState(state) {
    this.states.push(state);
  }

  cloneAndPushState(state) {
    this.pushState(this.cloneState(state));
  }

  cloneState(state) {
    return merge({}, state);
  }

  clearStates() {
    // clearing an array in javascript is sooo easy.... js Y?!?
    this.states.splice(0,this.states.length);
  }
}

export default VisualAlgorithm;
