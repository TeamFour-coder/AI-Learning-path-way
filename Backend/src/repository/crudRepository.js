export default function  crudRepository(model) {
    
    return {
    // Create a new document
    async create(data) {
        return await this.model.create(data);
    },

    // Get document by ID
    async getById(id, populateFields = "") {
        return await this.model.findById(id).populate(populateFields);
    },

    // Get document by any field
    async getByField(field, value, populateFields = "") {
        return await this.model.findOne({ [field]: value }).populate(populateFields);
    },

    // Get all documents
    async getAll(populateFields = "") {
        return await this.model.find().populate(populateFields);
    },
    // Update a document by ID
    async updateById(id, updateData) {
        return await this.model.findByIdAndUpdate(id, updateData, { new: true });
    },

    // Delete a document by ID
    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    },
  }
}

