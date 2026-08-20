import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminModel, hashPassword } from '@/lib/models/Admin';
import { TeamModel } from '@/lib/models/Team';
import { INITIAL_TEAMS } from '@/lib/phcl-data';

// GET /api/admin/seed — Seeds default admin credentials and the 8 official PHCL captains into MongoDB
export async function GET() {
  try {
    const db = await connectDB(true);

    // 1. Seed Admin User
    const existingAdmin = await AdminModel.findOne({ username: 'sarthak' });
    let adminSeeded = false;
    if (!existingAdmin) {
      await AdminModel.create({
        username: 'sarthak',
        passwordHash: hashPassword('2025HE0611'),
        role: 'Administrator'
      });
      adminSeeded = true;
    }

    // 2. Seed 8 Default Teams/Captains
    const existingTeamsCount = await TeamModel.countDocuments();
    let teamsSeeded = false;
    if (existingTeamsCount === 0 && INITIAL_TEAMS.length > 0) {
      await TeamModel.insertMany(INITIAL_TEAMS);
      teamsSeeded = true;
    }

    return NextResponse.json({
      success: true,
      message: 'Seeding completed successfully',
      adminSeeded,
      teamsSeeded,
      currentTeamsInDb: await TeamModel.countDocuments()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Seed error' },
      { status: 500 }
    );
  }
}
