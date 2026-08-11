import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamModel } from '@/lib/models/Team';
import { globalStore } from '@/lib/store';

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const teams = await TeamModel.find({}).lean();
      if (teams && teams.length > 0) {
        return NextResponse.json({ success: true, teams, source: 'MongoDB' });
      }
    }

    return NextResponse.json({ success: true, teams: globalStore.teams, source: 'Memory' });
  } catch (error: any) {
    return NextResponse.json({ success: true, teams: globalStore.teams, source: 'MemoryFallback', error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, captain, captainImage, captainBio, motto, badgeSymbol, themeColor } = body;

    if (!name || !captain) {
      return NextResponse.json({ success: false, message: 'Team name and captain are required' }, { status: 400 });
    }

    const teamId = body.id || name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const newTeamData = {
      id: teamId,
      name,
      captain,
      captainImage: captainImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      captainBio: captainBio || `Captain of ${name}`,
      motto: motto || 'Strive for Glory!',
      themeColor: themeColor || 'orange',
      bgGradient: 'from-slate-800 to-slate-900',
      borderColor: 'border-[#E87A2D]',
      shadowColor: 'shadow-orange-500/20',
      textColor: 'text-[#E87A2D]',
      badgeSymbol: badgeSymbol || '⚡',
      members: [
        {
          id: `${teamId}-mem-1`,
          name: captain,
          role: 'Captain',
          specialtyEvent: 'All-Rounder',
          department: 'Computer Engg',
          year: 'TE'
        }
      ]
    };

    const db = await connectDB();
    if (db) {
      const created = await TeamModel.create(newTeamData);
      // update memory store as well
      globalStore.teams = globalStore.teams.filter(t => t.id !== teamId);
      globalStore.teams.push(created.toObject());
      return NextResponse.json({ success: true, team: created, source: 'MongoDB' });
    }

    // Save to Memory Store
    globalStore.teams = globalStore.teams.filter(t => t.id !== teamId);
    globalStore.teams.push(newTeamData as any);
    return NextResponse.json({ success: true, team: newTeamData, source: 'Memory' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
