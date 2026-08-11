import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember {
  id: string;
  name: string;
  role: 'Captain' | 'Vice Captain' | 'Core Athlete' | 'Squad Member';
  specialtyEvent: string;
  department: string;
  year: string;
}

export interface ITeam extends Document {
  id: string;
  name: string;
  captain: string;
  captainImage: string;
  captainBio: string;
  motto: string;
  themeColor: string;
  bgGradient?: string;
  borderColor?: string;
  shadowColor?: string;
  textColor?: string;
  badgeSymbol: string;
  members: ITeamMember[];
  eventScores?: Record<string, number>;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['Captain', 'Vice Captain', 'Core Athlete', 'Squad Member'], required: true },
  specialtyEvent: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true }
});

const TeamSchema = new Schema<ITeam>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  captain: { type: String, required: true },
  captainImage: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
  captainBio: { type: String, default: 'Sports Team Captain' },
  motto: { type: String, default: 'Strive for Glory!' },
  themeColor: { type: String, default: 'orange' },
  bgGradient: { type: String, default: 'from-slate-800 to-slate-900' },
  borderColor: { type: String, default: 'border-[#E87A2D]' },
  shadowColor: { type: String, default: 'shadow-orange-500/20' },
  textColor: { type: String, default: 'text-[#E87A2D]' },
  badgeSymbol: { type: String, default: '⚡' },
  members: [TeamMemberSchema],
  eventScores: { type: Object, default: {} }
}, { timestamps: true });

export const TeamModel = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
