import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminModel, hashPassword } from '@/lib/models/Admin';

// GET /api/admin/seed — Seeds the default admin user into MongoDB if none exists
export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Check if an admin already exists
    const existingAdmin = await AdminModel.findOne({ username: 'sarthak' });
    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists in database',
        seeded: false
      });
    }

    // Create the default admin user
    await AdminModel.create({
      username: 'sarthak',
      passwordHash: hashPassword('2025HE0611'),
      role: 'Administrator'
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user seeded successfully into MongoDB',
      seeded: true
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Seed error' },
      { status: 500 }
    );
  }
}
