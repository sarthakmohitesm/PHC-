import mongoose, { Schema, Document } from 'mongoose';

export interface IFixture extends Document {
  id: string;
  eventId: string;
  eventName: string;
  eventIcon: string;
  teamAId: string;
  teamBId: string;
  stage: string;
  time: string;
  venue: string;
  status: 'Completed' | 'Live' | 'Upcoming';
  scoreA?: string;
  scoreB?: string;
  winnerTeamId?: string;
  mvp?: string;
}

const FixtureSchema = new Schema<IFixture>({
  id: { type: String, required: true, unique: true },
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
  eventIcon: { type: String, default: '🏆' },
  teamAId: { type: String, required: true },
  teamBId: { type: String, required: true },
  stage: { type: String, default: 'Group Stage' },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'Live', 'Upcoming'], default: 'Upcoming' },
  scoreA: { type: String, default: '0' },
  scoreB: { type: String, default: '0' },
  winnerTeamId: { type: String, default: '' },
  mvp: { type: String, default: '' }
}, { timestamps: true });

export const FixtureModel = mongoose.models.Fixture || mongoose.model<IFixture>('Fixture', FixtureSchema);
