import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamModel } from '@/lib/models/Team';
import { globalStore } from '@/lib/store';
import { INITIAL_TEAMS } from '@/lib/phcl-data';

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const teams = await TeamModel.find({}).lean();
      if (teams && teams.length > 0) {
        // If old placeholder teams exist, migrate them to the 8 official themed teams
        if (teams.some((t: any) => t.id === 'team-alpha' || t.captain === 'Captain 2' || t.name === 'Team Alpha')) {
          await TeamModel.deleteMany({});
          await TeamModel.insertMany(INITIAL_TEAMS);
          return NextResponse.json({ success: true, teams: INITIAL_TEAMS, source: 'MongoDBMigrated' });
        }

        const initialGreenVipers = INITIAL_TEAMS.find(team => team.id === 'team-junaid');
        const storedGreenVipers = teams.find(team =>
          team.id === 'team-junaid' ||
          team.name === 'Green Vipers' ||
          team.captain === 'Junaid Shabir'
        );
        if (
          initialGreenVipers &&
          storedGreenVipers &&
          storedGreenVipers.members.length !== initialGreenVipers.members.length
        ) {
          await TeamModel.updateOne(
            { _id: storedGreenVipers._id },
            {
              $set: {
                id: initialGreenVipers.id,
                name: initialGreenVipers.name,
                captain: initialGreenVipers.captain,
                captainBio: initialGreenVipers.captainBio,
                motto: initialGreenVipers.motto,
                members: initialGreenVipers.members
              }
            }
          );
          const updatedTeams = await TeamModel.find({}).lean();
          return NextResponse.json({ success: true, teams: updatedTeams, source: 'MongoDBRosterSynced' });
        }

        const initialBlackHawks = INITIAL_TEAMS.find(team => team.id === 'team-himanshu');
        const storedBlackHawks = teams.find(team =>
          team.id === 'team-himanshu' ||
          team.name === 'Black Hawks' ||
          team.name === 'Black Shadows' ||
          team.captain === 'Himanshu Mane'
        );
        if (
          initialBlackHawks &&
          storedBlackHawks &&
          storedBlackHawks.members.length !== initialBlackHawks.members.length
        ) {
          await TeamModel.updateOne(
            { _id: storedBlackHawks._id },
            { $set: { id: initialBlackHawks.id, members: initialBlackHawks.members } }
          );
          const updatedTeams = await TeamModel.find({}).lean();
          return NextResponse.json({ success: true, teams: updatedTeams, source: 'MongoDBRosterSynced' });
        }

        // Synchronize updated colors and themes if needed
        if (teams.some((t: any) => t.id === 'team-divesh' && (t.themeColor !== 'blue' || t.name !== 'Blue Knights'))) {
          for (const initTeam of INITIAL_TEAMS) {
            await TeamModel.updateOne(
              { id: initTeam.id },
              {
                $set: {
                  name: initTeam.name,
                  themeColor: initTeam.themeColor,
                  bgGradient: initTeam.bgGradient,
                  borderColor: initTeam.borderColor,
                  shadowColor: initTeam.shadowColor,
                  textColor: initTeam.textColor,
                  badgeSymbol: initTeam.badgeSymbol,
                  motto: initTeam.motto
                }
              },
              { upsert: true }
            );
          }
          const updatedTeams = await TeamModel.find({}).lean();
          return NextResponse.json({ success: true, teams: updatedTeams, source: 'MongoDBSynced' });
        }

        return NextResponse.json({ success: true, teams, source: 'MongoDB' });
      } else if (INITIAL_TEAMS.length > 0) {
        await TeamModel.insertMany(INITIAL_TEAMS);
        return NextResponse.json({ success: true, teams: INITIAL_TEAMS, source: 'MongoDBSeeded' });
      }
    }

    if (globalStore.teams.length === 0 && INITIAL_TEAMS.length > 0) {
      globalStore.teams = [...INITIAL_TEAMS];
    }

    return NextResponse.json({ success: true, teams: globalStore.teams, source: 'Memory' });
  } catch (error: any) {
    return NextResponse.json({ success: true, teams: globalStore.teams.length > 0 ? globalStore.teams : INITIAL_TEAMS, source: 'MemoryFallback', error: error.message });
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
