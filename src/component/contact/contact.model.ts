import { Schema, model } from 'mongoose';
import type { IContact, IContactModel } from './contact.interface';

const ContactSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true
  },
  name: String,
  avatarUrl: String,
  bio: String,
  location: String,
  email: String
}, { timestamps: true })

const ContactModel = model<IContact, IContactModel>('Contact', ContactSchema);
export { ContactModel };