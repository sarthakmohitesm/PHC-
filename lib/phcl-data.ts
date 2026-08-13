export interface TeamMember {
  id: string;
  name: string;
  role: 'Captain' | 'Vice Captain' | 'Core Athlete' | 'Squad Member';
  specialtyEvent: string;
  department: string;
  year: string;
}

export interface Team {
  id: string;
  name: string;
  captain: string;
  captainImage: string;
  captainBio: string;
  motto: string;
  themeColor: string;
  bgGradient: string;
  borderColor: string;
  shadowColor: string;
  textColor: string;
  badgeSymbol: string;
  members: TeamMember[];
  eventScores?: Record<string, number>; // eventId -> numeric points
}

export interface EventInfo {
  id: string;
  name: string;
  icon: string;
  category: 'Outdoor Sports' | 'Indoor Sports' | 'Mind & Athletics' | 'Cultural & Speech';
  eventType: 'Group Event' | 'Individual Event';
  venue: string;
  teamSize: string;
  description: string;
  rules: string[];
  status: 'Completed' | 'Live' | 'Upcoming';
  scheduledTime: string;
  pointsScale: {
    first: number;
    second: number;
    third: number;
    participation: number;
  };
}

export interface EventResult {
  eventId: string;
  eventName: string;
  firstTeamId: string;
  secondTeamId: string;
  thirdTeamId: string;
  participatingTeamIds: string[];
}

export interface MatchFixture {
  id: string;
  eventId: string;
  eventName: string;
  eventIcon: string;
  teamAId: string;
  teamBId: string;
  stage: 'Quarter Final' | 'Semi Final' | 'Final' | 'Group Stage';
  time: string;
  venue: string;
  status: 'Completed' | 'Live' | 'Upcoming';
  scoreA?: string;
  scoreB?: string;
  winnerTeamId?: string;
  mvp?: string;
}

// 9 Official PHCL Season 5 Events
export const PHCL_EVENTS: EventInfo[] = [
  {
    id: 'futsal',
    name: 'Futsal',
    icon: '⚽',
    category: 'Outdoor Sports',
    eventType: 'Group Event',
    venue: 'Main Lawn',
    teamSize: '3 Players per team',
    description: 'Fast-paced 3v3 lawn futsal with flying goalkeepers, goal line rules, and penalty shootout tiebreakers.',
    rules: [
      'Reporting time strictly 9.30 AM.',
      'Goals must be below waist height. Corner kicks apply.',
      'Outsides considered but NO offsides. Studs strictly prohibited.',
      'Flying Goalkeeper allowed (hands permitted only inside D-Box).',
      'Match duration: 20 minutes (2 min assemble, 8 min 1st half, 2 min break, 8 min 2nd half).',
      'Tiebreakers: Goal difference first -> 3 Penalties -> Toss/Chits.'
    ],
    status: 'Completed',
    scheduledTime: 'Day 1 - 01:30 PM',
    pointsScale: { first: 50, second: 30, third: 20, participation: 10 }
  },
  {
    id: 'box-cricket',
    name: 'Box Cricket',
    icon: '🏏',
    category: 'Outdoor Sports',
    eventType: 'Group Event',
    venue: 'Main Lawn',
    teamSize: '6 Players',
    description: 'High-octane lawn box cricket with underarm bowling, 3-over matches, and strict boundary rules.',
    rules: [
      'Reporting time strictly 9.30 AM.',
      'Each match consists of 3 overs.',
      'Maximum 1 over per bowler.',
      'Wickets count: Catch, Bowled, Run-out, Stumped & Hit Wicket.',
      'Underarm bowling only; proper bowling action required without throwing.',
      'Hitting out of the box on a no-ball results in batsman declared OUT.'
    ],
    status: 'Completed',
    scheduledTime: 'Day 1 - 09:30 AM',
    pointsScale: { first: 50, second: 30, third: 20, participation: 10 }
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    category: 'Outdoor Sports',
    eventType: 'Group Event',
    venue: 'Basketball Court',
    teamSize: '3 Members',
    description: 'Fast 3v3 basketball showdown with 6-minute fast-paced half matches.',
    rules: [
      'Team size: 3 members per side.',
      'Duration: 6 minutes total (3 minutes per half).',
      'Proper basketball kit and court shoes mandatory.',
      'Scoring: 3-pointer = 2 points, 2-pointer = 1 point.',
      'Defensive team must play strictly within the defensive lane.'
    ],
    status: 'Completed',
    scheduledTime: 'Day 2 - 04:00 PM',
    pointsScale: { first: 50, second: 30, third: 20, participation: 10 }
  },
  {
    id: 'relay',
    name: 'Relay',
    icon: '🏃',
    category: 'Outdoor Sports',
    eventType: 'Group Event',
    venue: 'Main Ground',
    teamSize: '4 Participants',
    description: 'High-speed team baton relay race testing sprint velocity and baton exchange precision.',
    rules: [
      'Team consists of 4 runners per squad.',
      'Baton pass must occur strictly within the designated exchange zone.',
      'Dropping the baton requires the runner to pick it up without interfering with other lanes.',
      'Spike shoes are NOT allowed. Proper running attire required.',
      'Camera tracking near finish line for photo-finish decisions.'
    ],
    status: 'Live',
    scheduledTime: 'Day 2 - 10:00 AM',
    pointsScale: { first: 50, second: 30, third: 20, participation: 10 }
  },
  {
    id: 'debate',
    name: 'Debate',
    icon: '🎤',
    category: 'Cultural & Speech',
    eventType: 'Group Event',
    venue: 'PHCET Reception',
    teamSize: '2 Participants',
    description: 'Formal 10-minute parliamentary debate clash testing logic, evidence, and persuasive rhetoric.',
    rules: [
      'Total debate duration: 10 minutes.',
      'Round 1 topic provided 1 day prior. On-spot topics get 10 minutes preparation.',
      'Affirmative & Negative teams must maintain assigned stances without shifting.',
      'Speakers must provide evidence/facts. No new points allowed in rebuttals.',
      'Maximum 1 minute speaking time per speaker. Interruptions strictly prohibited.'
    ],
    status: 'Upcoming',
    scheduledTime: 'Day 3 - 11:00 AM',
    pointsScale: { first: 50, second: 30, third: 20, participation: 10 }
  },
  {
    id: 'chess',
    name: 'Chess',
    icon: '♟️',
    category: 'Indoor Sports',
    eventType: 'Individual Event',
    venue: 'PHCET Reception',
    teamSize: '1 Participant',
    description: 'Tactical grandmaster chess under 10-minute clock control per player.',
    rules: [
      'Reporting time strictly 9.30 AM.',
      'Clock timing: 10 minutes per player.',
      'Accumulating 2 illegal moves results in immediate loss.',
      'Misbehavior or distraction results in team disqualification.'
    ],
    status: 'Completed',
    scheduledTime: 'Day 1 - 04:00 PM',
    pointsScale: { first: 30, second: 20, third: 10, participation: 5 }
  },
  {
    id: 'shotput',
    name: 'Shotput',
    icon: '☄️',
    category: 'Outdoor Sports',
    eventType: 'Individual Event',
    venue: 'Main Ground',
    teamSize: '1 Participant',
    description: 'Heavy shotput throws testing upper body strength and technique across 3 attempts.',
    rules: [
      '3 rounds per athlete, best distance attempt considered.',
      'Shot must be released with one hand above shoulder height.',
      'Stepping out of circle before landing results in immediate foul.',
      'Shotput weights: Girls 5kg, Boys 7kg.'
    ],
    status: 'Completed',
    scheduledTime: 'Day 2 - 11:00 AM',
    pointsScale: { first: 30, second: 20, third: 10, participation: 5 }
  },
  {
    id: 'badminton',
    name: 'Badminton',
    icon: '🏸',
    category: 'Indoor Sports',
    eventType: 'Individual Event',
    venue: 'Main Lawn',
    teamSize: '1 Participant',
    description: 'Singles badminton tournament requiring quick footwork and precise racket control.',
    rules: [
      'Reporting time strictly 9.30 AM.',
      'Umpire decision is absolute and final.',
      'Matches consist of best of 3 sets, 11 points per set.',
      'Misbehavior or unsportsmanlike conduct results in immediate team DQ.'
    ],
    status: 'Completed',
    scheduledTime: 'Day 1 - 11:30 AM',
    pointsScale: { first: 30, second: 20, third: 10, participation: 5 }
  },
  {
    id: 'quiz',
    name: 'Quiz',
    icon: '🧠',
    category: 'Mind & Athletics',
    eventType: 'Group Event',
    venue: 'PHCET Reception',
    teamSize: '2 Participants',
    description: 'Multi-round intellectual battle featuring Rapid Fire, Buzzer Round, and High Stakes Q&A.',
    rules: [
      'Round 1 (Rapid Fire): 2 Groups of 5 teams. 15 seconds to answer max questions.',
      'Round 2 (Buzzer Round): Top 6 teams compete across 15 questions.',
      'Round 3 (Final Q&A): Top 4 teams compete across 10 questions.'
    ],
    status: 'Completed',
    scheduledTime: 'Day 2 - 02:00 PM',
    pointsScale: { first: 50, second: 30, third: 20, participation: 10 }
  }
];

// Common Rules from Season 5 Rulebook
export const COMMON_RULES: string[] = [
  'Reporting Time: Captains must ensure teams report at least 30 minutes before match time. Failure to report may lead to disqualification.',
  'Disqualification: Any misbehavior during the event will lead to immediate disqualification of the team.',
  'Eligibility: All participants must be enrolled students for AY 2025-26. Dropout or provisional admission students are NOT eligible.',
  'Dropout Penalty: If a member has dropout status, the team must play one player short or forfeit match points.',
  'Referees & Judges: Decisions made by official referees/judges are final and binding.',
  'Badges & Wristbands: All team members must wear allotted PHCL badges/wristbands throughout competition.',
  'Substitutions: Maximum 1 substitution per team allowed in case of emergency (subject to referee approval).',
  'Rule Adaptability: Event rules are subject to change based on time schedule and venue conditions.'
];

// INITIAL TEAMS - Empty by default; Admin adds up to 10 Captains & Team Names
export const INITIAL_TEAMS: Team[] = [];

export const INITIAL_EVENT_RESULTS: EventResult[] = [];

export const MATCH_FIXTURES: MatchFixture[] = [];

export interface TeamLeaderboardEntry {
  rank: number;
  team: Team;
  totalPoints: number;
  eventsWon: number;
  eventsParticipated: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
  breakdown: { eventId: string; eventName: string; points: number; position: string }[];
}

export function computeLeaderboard(teams: Team[], eventResults: EventResult[]): TeamLeaderboardEntry[] {
  const standingsMap: Record<string, {
    totalPoints: number;
    eventsWon: number;
    eventsParticipated: number;
    goldCount: number;
    silverCount: number;
    bronzeCount: number;
    breakdown: { eventId: string; eventName: string; points: number; position: string }[];
  }> = {};

  teams.forEach(t => {
    standingsMap[t.id] = {
      totalPoints: 0,
      eventsWon: 0,
      eventsParticipated: 0,
      goldCount: 0,
      silverCount: 0,
      bronzeCount: 0,
      breakdown: []
    };

    // Calculate direct matrix points assigned by Admin per event (only for official 9 PHCL_EVENTS)
    if (t.eventScores && typeof t.eventScores === 'object') {
      PHCL_EVENTS.forEach(ev => {
        const rawScore = t.eventScores ? t.eventScores[ev.id] : undefined;
        const numScore = Math.max(0, Number(rawScore) || 0);
        if (numScore > 0) {
          standingsMap[t.id].totalPoints += numScore;
          standingsMap[t.id].eventsParticipated += 1;
          if (numScore >= 30) {
            standingsMap[t.id].eventsWon += 1;
          }
          standingsMap[t.id].breakdown.push({
            eventId: ev.id,
            eventName: ev.name,
            points: numScore,
            position: `Score: +${numScore} pts`
          });
        }
      });
    }
  });

  // Calculate eventResults if direct matrix score wasn't set
  eventResults.forEach(res => {
    const eventObj = PHCL_EVENTS.find(e => e.id === res.eventId);
    const scale = eventObj ? eventObj.pointsScale : { first: 50, second: 30, third: 20, participation: 10 };

    // 1st Place
    if (res.firstTeamId && standingsMap[res.firstTeamId]) {
      const alreadyScored = standingsMap[res.firstTeamId].breakdown.some(b => b.eventId === res.eventId);
      if (!alreadyScored) {
        standingsMap[res.firstTeamId].totalPoints += scale.first;
        standingsMap[res.firstTeamId].eventsWon += 1;
        standingsMap[res.firstTeamId].eventsParticipated += 1;
        standingsMap[res.firstTeamId].breakdown.push({
          eventId: res.eventId,
          eventName: res.eventName || (eventObj ? eventObj.name : res.eventId),
          points: scale.first,
          position: `1st Place`
        });
      }
    }

    // 2nd Place
    if (res.secondTeamId && standingsMap[res.secondTeamId]) {
      const alreadyScored = standingsMap[res.secondTeamId].breakdown.some(b => b.eventId === res.eventId);
      if (!alreadyScored) {
        standingsMap[res.secondTeamId].totalPoints += scale.second;
        standingsMap[res.secondTeamId].eventsParticipated += 1;
        standingsMap[res.secondTeamId].breakdown.push({
          eventId: res.eventId,
          eventName: res.eventName || (eventObj ? eventObj.name : res.eventId),
          points: scale.second,
          position: `2nd Place`
        });
      }
    }

    // 3rd Place
    if (res.thirdTeamId && standingsMap[res.thirdTeamId]) {
      const alreadyScored = standingsMap[res.thirdTeamId].breakdown.some(b => b.eventId === res.eventId);
      if (!alreadyScored) {
        standingsMap[res.thirdTeamId].totalPoints += scale.third;
        standingsMap[res.thirdTeamId].eventsParticipated += 1;
        standingsMap[res.thirdTeamId].breakdown.push({
          eventId: res.eventId,
          eventName: res.eventName || (eventObj ? eventObj.name : res.eventId),
          points: scale.third,
          position: `3rd Place`
        });
      }
    }
  });

  const list: TeamLeaderboardEntry[] = teams.map(t => ({
    rank: 0,
    team: t,
    ...standingsMap[t.id]
  }));

  // Sort by Total Points descending, then Events Won descending, then team name
  list.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.eventsWon !== a.eventsWon) return b.eventsWon - a.eventsWon;
    return a.team.name.localeCompare(b.team.name);
  });

  // Assign ranks
  list.forEach((item, index) => {
    item.rank = index + 1;
  });

  return list;
}
