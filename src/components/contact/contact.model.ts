import { prop, getModelForClass, modelOptions, plugin } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import mongoosePaginate from 'mongoose-paginate-v2';

@modelOptions({ schemaOptions: { timestamps: true }})
@plugin(mongoosePaginate)
export class Contact extends Base {

  @prop({ unique: true, required: true })
  public username!: string;

  @prop()
  public name?: string;

  @prop()
  public avatarUrl?: string;

  @prop()
  public bio?: string;
  
  @prop()
  public location?: string;

  @prop()
  public email?: string;
}

export const ContactModel = getModelForClass(Contact);