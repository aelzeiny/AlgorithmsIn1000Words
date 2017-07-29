import SortController from './sort_controller';
import BubbleSort from '../../models/sorts/bubble_sort';

class BubbleSortController extends SortController {
  constructor(main) {
    super(main);
    this.algorithm = new BubbleSort(50);
  }

  load(element) {
    super.load(element);
  }

  unload() {
    super.unload();
  }
}

export default BubbleSortController;
