import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EventResultModel } from '@/lib/models/EventResult';
import { globalStore } from '@/lib/store';

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const results = await EventResultModel.find({}).lean();
      if (results && results.length > 0) {
        return NextResponse.json({ success: true, results, source: 'MongoDB' });
      }
    }

    return NextResponse.json({ success: true, results: globalStore.results, source: 'Memory' });
  } catch (error: any) {
    return NextResponse.json({ success: true, results: globalStore.results, source: 'MemoryFallback', error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, eventName, firstTeamId, secondTeamId, thirdTeamId, participatingTeamIds } = body;

    if (!eventId) {
      return NextResponse.json({ success: false, message: 'eventId is required' }, { status: 400 });
    }

    const payload = {
      eventId,
      eventName: eventName || eventId,
      firstTeamId: firstTeamId || '',
      secondTeamId: secondTeamId || '',
      thirdTeamId: thirdTeamId || '',
      participatingTeamIds: participatingTeamIds || []
    };

    const db = await connectDB();
    if (db) {
      const updated = await EventResultModel.findOneAndUpdate(
        { eventId },
        { $set: payload },
        { upsert: true, new: true }
      );

      // update memory store as well
      const idx = globalStore.results.findIndex(r => r.eventId === eventId);
      if (idx !== -1) {
        globalStore.results[idx] = updated.toObject();
      } else {
        globalStore.results.push(updated.toObject());
      }

      return NextResponse.json({ success: true, result: updated, source: 'MongoDB' });
    }

    // Memory Store Update
    const idx = globalStore.results.findIndex(r => r.eventId === eventId);
    if (idx !== -1) {
      globalStore.results[idx] = payload;
    } else {
      globalStore.results.push(payload);
    }

    return NextResponse.json({ success: true, result: payload, source: 'Memory' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
