// DONE REVIEWING
class APIFeatures {
  constructor(databaseQuery, requestQuery) {
    this.databaseQuery = databaseQuery
    this.requestQuery = requestQuery
  }

  filter() {
    const queryObject = {...this.requestQuery}
    const excludedFields = ["fields", "page", "limit", "sort"]
    excludedFields.forEach((element) => delete queryObject[element])

    let queryString = JSON.stringify(queryObject)
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    )

    this.databaseQuery = this.databaseQuery.find(JSON.parse(queryString))
    return this
  }

  fields() {
    let fields = "-__v"
    if (this.requestQuery.fields)
      fields = this.requestQuery.fields.replace(/,/g, " ")
    this.databaseQuery = this.databaseQuery.select(fields)
    return this
  }

  paginate() {
    const page = Number(this.requestQuery.page) || 1
    const limit = Number(this.requestQuery.limit) || 100
    const skip = (page - 1) * limit
    this.databaseQuery = this.databaseQuery.skip(skip).limit(limit)
    return this
  }

  sort() {
    let sort = "-schedule"
    if (this.requestQuery.sort) sort = this.requestQuery.sort.replace(/,/g, " ")
    this.databaseQuery = this.databaseQuery.sort(sort)
    return this
  }
}

module.exports = APIFeatures
