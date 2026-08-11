import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Admin credentials (username: sarthak, password: 2025HE0611)
    const validUsername = process.env.ADMIN_USERNAME || 'sarthak';
    const validPassword = process.env.ADMIN_PASSWORD || '2025HE0611';

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        token: 'phcl_admin_token_2026_verified',
        admin: {
          username: validUsername,
          role: 'Administrator'
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
