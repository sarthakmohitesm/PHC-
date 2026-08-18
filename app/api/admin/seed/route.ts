import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminModel, hashPassword } from '@/lib/models/Admin';
import { TeamModel } from '@/lib/models/Team';

const DEFAULT_TEAMS = [
  {
    id: 'team-alpha',
    name: 'Team Alpha',
    captain: 'Sarthak Mohite',
    captainImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop&crop=face',
    captainBio: 'All-round sports champion leading Team Alpha to victory.',
    motto: 'Aim for the Apex!',
    themeColor: 'orange',
    badgeSymbol: '🐯',
    members: [
      { id: 'alpha-mem-1', name: 'Sarthak Mohite', role: 'Captain', specialtyEvent: 'Cricket', department: 'Computer Engg', year: 'TE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-bravo',
    name: 'Team Bravo',
    captain: 'Captain 2',
    captainImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Experienced tactician pushing boundaries in Box Cricket.',
    motto: 'Fortitude and Power!',
    themeColor: 'blue',
    badgeSymbol: '🦁',
    members: [
      { id: 'bravo-mem-1', name: 'Captain 2', role: 'Captain', specialtyEvent: 'Football', department: 'Mechanical Engg', year: 'BE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-charlie',
    name: 'Team Charlie',
    captain: 'Captain 3',
    captainImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Passionate team lead focus on indoor athletics.',
    motto: 'Unleash the Pack!',
    themeColor: 'green',
    badgeSymbol: '🐺',
    members: [
      { id: 'charlie-mem-1', name: 'Captain 3', role: 'Captain', specialtyEvent: 'Carrom', department: 'Civil Engg', year: 'SE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-delta',
    name: 'Team Delta',
    captain: 'Captain 4',
    captainImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Vocal captain driving standard regulations.',
    motto: 'Suffer Now, Triumph Later!',
    themeColor: 'red',
    badgeSymbol: '🦅',
    members: [
      { id: 'delta-mem-1', name: 'Captain 4', role: 'Captain', specialtyEvent: 'Chess', department: 'IT', year: 'TE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-echo',
    name: 'Team Echo',
    captain: 'Captain 5',
    captainImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Calculated decision maker leading with speed.',
    motto: 'Charging Forward!',
    themeColor: 'purple',
    badgeSymbol: '🦏',
    members: [
      { id: 'echo-mem-1', name: 'Captain 5', role: 'Captain', specialtyEvent: 'BGMI', department: 'ECS', year: 'BE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-foxtrot',
    name: 'Team Foxtrot',
    captain: 'Captain 6',
    captainImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Resilient leader focus on coordination.',
    motto: 'Outsmart, Outplay!',
    themeColor: 'teal',
    badgeSymbol: '🦊',
    members: [
      { id: 'foxtrot-mem-1', name: 'Captain 6', role: 'Captain', specialtyEvent: 'Volleyball', department: 'Automobile', year: 'TE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-golf',
    name: 'Team Golf',
    captain: 'Captain 7',
    captainImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Strategy master specialized in physical events.',
    motto: 'Run Like the Wind!',
    themeColor: 'pink',
    badgeSymbol: '🐴',
    members: [
      { id: 'golf-mem-1', name: 'Captain 7', role: 'Captain', specialtyEvent: 'Athletics', department: 'Computer Engg', year: 'SE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-hotel',
    name: 'Team Hotel',
    captain: 'Captain 8',
    captainImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Energetic frontrunner driving maximum scores.',
    motto: 'Unyielding Strength!',
    themeColor: 'amber',
    badgeSymbol: '🐻',
    members: [
      { id: 'hotel-mem-1', name: 'Captain 8', role: 'Captain', specialtyEvent: 'Table Tennis', department: 'Civil Engg', year: 'BE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-india',
    name: 'Team India',
    captain: 'Captain 9',
    captainImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Agile team captain aiming for gold.',
    motto: 'Swift and Precise!',
    themeColor: 'lime',
    badgeSymbol: '🦌',
    members: [
      { id: 'india-mem-1', name: 'Captain 9', role: 'Captain', specialtyEvent: 'Valorant', department: 'ECS', year: 'TE' }
    ],
    eventScores: {}
  },
  {
    id: 'team-juliet',
    name: 'Team Juliet',
    captain: 'Captain 10',
    captainImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face',
    captainBio: 'Focused leader specialized in e-sports tournaments.',
    motto: 'Rule the Depths!',
    themeColor: 'cyan',
    badgeSymbol: '🦈',
    members: [
      { id: 'juliet-mem-1', name: 'Captain 10', role: 'Captain', specialtyEvent: 'Football', department: 'IT', year: 'SE' }
    ],
    eventScores: {}
  }
];

// GET /api/admin/seed — Seeds default admin credentials and 10 default teams/captains into MongoDB
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

    // 2. Seed 10 Default Teams/Captains
    const existingTeamsCount = await TeamModel.countDocuments();
    let teamsSeeded = false;
    if (existingTeamsCount === 0) {
      await TeamModel.insertMany(DEFAULT_TEAMS);
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
