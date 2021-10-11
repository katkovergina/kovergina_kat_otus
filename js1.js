function sum(term) {
    this.count = this.count || 0
    if (term === undefined || term === null) {
      return this.count
    }

    this.count += Number(term)
    return sum
  }

  console.log(sum(1)(2)(3)())