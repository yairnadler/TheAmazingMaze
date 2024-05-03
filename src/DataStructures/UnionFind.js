class UnionFind {
  constructor(numElements) {
    this.representatives = new Array(numElements).fill(-1);
    this.weights = new Array(numElements).fill(1);
    this.numSets = numElements;
  }

  // Find the representative of the set that contains i and compress the path
  find(i) {
    let representitive = i;
    while (this.representatives[representitive] !== -1) {
      representitive = this.representatives[representitive];
    }
    if (i !== representitive) {
      let k = this.representatives[i];
      while (k !== representitive) {
        this.representatives[i] = representitive;
        i = k;
        k = this.representatives[k];
      }
    }
    return representitive;
  }

  // Union the sets that contain i and j
  // If i or j are not representatives, find their representatives
  union(i, j) {
    if (this.weights[i] >= this.weights[j]) {
      this.representatives[j] = i;
      this.weights[i] += this.weights[j];
    } else {
      this.representatives[i] = j;
      this.weights[j] += this.weights[i];
    }
    this.numSets--;
  }
}

export default UnionFind;
