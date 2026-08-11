import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamModel } from '@/lib/models/Team';
import { globalStore } from '@/lib/store';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, member, teamData, eventScores } = body;

    const db = await connectDB();

    if (action === 'updateScores' && eventScores) {
      if (db) {
        const updated = await TeamModel.findOneAndUpdate(
          { id },
          { $set: { eventScores } },
          { new: true }
        );
        if (updated) {
          const idx = globalStore.teams.findIndex(t => t.id === id);
          if (idx !== -1) globalStore.teams[idx] = updated.toObject();
          return NextResponse.json({ success: true, team: updated });
        }
      }

      // Memory Fallback
      const team = globalStore.teams.find(t => t.id === id);
      if (team) {
        team.eventScores = eventScores;
        return NextResponse.json({ success: true, team });
      }
    }

    if (action === 'addMember' && member) {
      if (db) {
        const updated = await TeamModel.findOneAndUpdate(
          { id },
          { $push: { members: member } },
          { new: true }
        );
        if (updated) {
          const idx = globalStore.teams.findIndex(t => t.id === id);
          if (idx !== -1) globalStore.teams[idx] = updated.toObject();
          return NextResponse.json({ success: true, team: updated });
        }
      }

      // Memory Fallback
      const team = globalStore.teams.find(t => t.id === id);
      if (team) {
        team.members.push(member);
        return NextResponse.json({ success: true, team });
      }
    }

    if (action === 'updateTeam' && teamData) {
      if (db) {
        const updated = await TeamModel.findOneAndUpdate(
          { id },
          { $set: teamData },
          { new: true }
        );
        if (updated) {
          const idx = globalStore.teams.findIndex(t => t.id === id);
          if (idx !== -1) globalStore.teams[idx] = updated.toObject();
          return NextResponse.json({ success: true, team: updated });
        }
      }

      const idx = globalStore.teams.findIndex(t => t.id === id);
      if (idx !== -1) {
        globalStore.teams[idx] = { ...globalStore.teams[idx], ...teamData };
        return NextResponse.json({ success: true, team: globalStore.teams[idx] });
      }
    }

    return NextResponse.json({ success: false, message: 'Invalid action or team not found' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get('memberId');

    const db = await connectDB();

    if (memberId) {
      if (db) {
        const updated = await TeamModel.findOneAndUpdate(
          { id },
          { $pull: { members: { id: memberId } } },
          { new: true }
        );
        if (updated) {
          const idx = globalStore.teams.findIndex(t => t.id === id);
          if (idx !== -1) globalStore.teams[idx] = updated.toObject();
          return NextResponse.json({ success: true, team: updated });
        }
      }

      const team = globalStore.teams.find(t => t.id === id);
      if (team) {
        team.members = team.members.filter(m => m.id !== memberId);
        return NextResponse.json({ success: true, team });
      }
    } else {
      if (db) {
        await TeamModel.deleteOne({ id });
      }
      globalStore.teams = globalStore.teams.filter(t => t.id !== id);
      return NextResponse.json({ success: true, message: 'Team deleted' });
    }

    return NextResponse.json({ success: false, message: 'Team not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
