// Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeCollection {

    /**
     *  Init collection of ranges in constructor
     */
    constructor(){
        this._collection = [];
    }

    /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        if (this._validate(range)) {
            const rangeStart = range[0];
            const rangeEnd = range[1];

            if (!this._collection.length || this._moreThanCollectionRanges(rangeStart)) {
                return this._collection.push(range);
            }
            const tempCollection = [];
            for (const currentRange of this._collection) {
                const currentRangeStart = currentRange[0];
                const currentRangeEnd = currentRange[1];

                if (rangeStart > currentRangeEnd || rangeEnd < currentRangeEnd) {
                    tempCollection.push(currentRange);
                    continue;
                }
                const start = rangeStart < currentRangeStart ? rangeStart : currentRangeStart;
                const end = rangeEnd > currentRangeEnd ? rangeEnd : currentRangeEnd;
                tempCollection.push([start, end]);
            }
            this._collection = tempCollection;
        }
    }

    /**
     * Check if provided range start more than collection ranges
     * @param {number} rangeStart - number from which range starts
     * @returns {boolean}
     * @private
     */
    _moreThanCollectionRanges(rangeStart){
        return rangeStart > this._collection[this._collection.length - 1][1]
    }

    /**
     * Validate provided range
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     * @returns {boolean}
     * @private
     */
    _validate(range){
        return Array.isArray(range) &&
            range.length === 2 &&
            range.every((edge) => typeof edge ==='number' && (edge % 1) === 0) &&
            range[0] <= range[1];
    }

    /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        if (this._validate(range) && this._collection.length) {
            const rangeStart = range[0];
            const rangeEnd = range[1];

            if (this._moreThanCollectionRanges(rangeStart)){
                return;
            }
            const tempCollection = this._collection.reduce((acc, currentRange) => {
                const currentRangeStart = currentRange[0];
                const currentRangeEnd = currentRange[1];

                if (rangeStart > currentRange[1]){
                    return [...acc, currentRange];
                }
                const start = rangeStart > currentRangeStart ? [[currentRangeStart, rangeStart]] : [];
                const end = rangeEnd > currentRangeStart && rangeEnd < currentRangeEnd ?  [rangeEnd, currentRangeEnd] : currentRange;

                if (rangeEnd > currentRangeEnd){
                   return [...acc, ...start];
                }
                return [...acc, ...start, end];
            }, []);
            this._collection = tempCollection;
        }
    }
  
    /**
     * Prints out the list of ranges in the range collection
     */
    print() {
        console.log(this._collection.map((range) => `[${range.join(', ')})`).join(' '));
    }
  }
  
  // Example run
  const rc = new RangeCollection();
  
  rc.add([1, 5]);
  rc.print();
  // Should display: [1, 5)
  
  rc.add([10, 20]);
  rc.print();
  // Should display: [1, 5) [10, 20)
  
  rc.add([20, 20]);
  rc.print();
  // Should display: [1, 5) [10, 20)

  rc.add([20, 21]);
  rc.print();
  // Should display: [1, 5) [10, 21)

  rc.add([2, 4]);
  rc.print();
  // Should display: [1, 5) [10, 21)

  rc.add([3, 8]);
  rc.print();
  // Should display: [1, 8) [10, 21)

  rc.remove([10, 10]);
  rc.print();
  // Should display: [1, 8) [10, 21)

  rc.remove([10, 11]);
  rc.print();
  // Should display: [1, 8) [11, 21)

  rc.remove([15, 17]);
  rc.print();
  // Should display: [1, 8) [11, 15) [17, 21)

  rc.remove([3, 19]);
  rc.print();
  // Should display: [1, 3) [19, 21)