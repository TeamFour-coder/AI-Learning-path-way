export default function  crudRepository(model) {
    
    return {
    // Create a new document
    async create(data) {
        return await model.create(data);
    },

    // Get document by ID
    async getById(id, populateFields = "") {
        return await model.findById(id).populate(populateFields);
    },

    // Get document by any field
    async getByField(field, value, populateFields = "") {
        return await model.findOne({ [field]: value }).populate(populateFields);
    },

    // Get all documents
    async getAll(populateFields = "") {
        return await model.find().populate(populateFields);
    },
    // Update a document by ID
    async updateById(id, updateData) {
        return await model.findByIdAndUpdate(id, updateData, { new: true });
    },

    // Delete a document by ID
    async deleteById(id) {
        return await model.findByIdAndDelete(id);
    },
  }
}

