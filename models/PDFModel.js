import mongoose from 'mongoose';

const PDFSchema = new mongoose.Schema({
  title: String,
  content: String,
  dateUploaded: { type: Date, default: Date.now },
});

const PDF = mongoose.model('PDF', PDFSchema);

export default PDF;
