import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { FixtureModel } from '@/lib/models/Fixture';
import { globalStore } from '@/lib/store';

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const fixtures = await FixtureModel.find({}).lean();
      if (fixtures && fixtures.length > 0) {
        return NextResponse.json({ success: true, fixtures, source: 'MongoDB' });
      }
    }

    return NextResponse.json({ success: true, fixtures: globalStore.fixtures, source: 'Memory' });
  } catch (error: any) {
    return NextResponse.json({ success: true, fixtures: globalStore.fixtures, source: 'MemoryFallback', error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, eventId, eventName, teamAId, teamBId, stage, time, venue, status, scoreA, scoreB, winnerTeamId, mvp } = body;

    const fixtureId = id || `fix-${Date.now()}`;

    const payload = {
      id: fixtureId,
      eventId: eventId || 'general',
      eventName: eventName || 'Match',
      eventIcon: body.eventIcon || '🏆',
      teamAId,
      teamBId,
      stage: stage || 'Group Stage',
      time: time || 'TBD',
      venue: venue || 'Main Lawn',
      status: status || 'Upcoming',
      scoreA: scoreA || '0',
      scoreB: scoreB || '0',
      winnerTeamId: winnerTeamId || '',
      mvp: mvp || ''
    };

    const db = await connectDB();
    if (db) {
      const updated = await FixtureModel.findOneAndUpdate(
        { id: fixtureId },
        { $set: payload },
        { upsert: true, new: true }
      );

      const idx = globalStore.fixtures.findIndex(f => f.id === fixtureId);
      if (idx !== -1) {
        globalStore.fixtures[idx] = updated.toObject();
      } else {
        globalStore.fixtures.push(updated.toObject());
      }

      return NextResponse.json({ success: true, fixture: updated, source: 'MongoDB' });
    }

    const idx = globalStore.fixtures.findIndex(f => f.id === fixtureId);
    if (idx !== -1) {
      globalStore.fixtures[idx] = payload;
    } else {
      globalStore.fixtures.push(payload);
    }

    return NextResponse.json({ success: true, fixture: payload, source: 'Memory' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
