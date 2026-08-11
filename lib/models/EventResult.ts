import mongoose, { Schema, Document } from 'mongoose';

export interface IEventResult extends Document {
  eventId: string;
  eventName: string;
  firstTeamId: string;
  secondTeamId: string;
  thirdTeamId: string;
  participatingTeamIds: string[];
}

const EventResultSchema = new Schema<IEventResult>({
  eventId: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  firstTeamId: { type: String, default: '' },
  secondTeamId: { type: String, default: '' },
  thirdTeamId: { type: String, default: '' },
  participatingTeamIds: [{ type: String }]
}, { timestamps: true });

export const EventResultModel = mongoose.models.EventResult || mongoose.model<IEventResult>('EventResult', EventResultSchema);
