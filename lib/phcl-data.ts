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
    description: 'Fast-paced 3v3 lawn futsal with no offside rule, rise penalties, and corner kicks in a high-intensity format.',
    rules: [
      'Reporting Time: All teams and players must report to the venue by 9:30 AM. Teams must be ready and present before their scheduled match.',
      'Tournament Format: 2 groups with 4 teams each. Matches played in 3v3 format.',
      'Match Duration: 20 minutes total — 2 min assemble, 8 min first half, 2 min half-time break, 8 min second half.',
      'Corners: Corner kicks will be considered and awarded according to the situation.',
      'Out of Bounds: Ball going outside the playing area is considered out. Restart given from the point where the ball went out.',
      'Offside: There will be no offside rule in the 3v3 tournament.',
      'Footwear: Studded footwear is strictly prohibited. Players must wear suitable non-studded sports shoes.',
      'Ball Height – Rise Rule: A ball played above Waist height is a rise. 3 rises by a team will result in a penalty being awarded against that team.',
      'Fouls: 3 fouls by a team will result in a penalty. The referee\'s decision regarding fouls will be final.'
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
    teamSize: '5 Players',
    description: 'High-octane box cricket with underarm bowling, 3-over matches, strict boundary rules, and Super Over tiebreakers.',
    rules: [
      'Tournament Format: 2 groups with 4 teams in each group.',
      'All teams and players must report to the venue by 9:00 AM.',
      'Each match will consist of 3 overs per team.',
      'Non-striker must stay fully within the crease until the ball is delivered. A penalty of -1 run will be awarded to the batting team every time a non-striker steps out, and no runs can be scored off that ball.',
      'In case of a tie, a Super Over will be played — each team bats and bowls for one over to determine the winner.',
      'Overarm bowling and throwing are not allowed. The bowler must deliver the ball using an appropriate bowling action.',
      'If the batsman hits the ball outside the designated playing box on a no-ball, or if the ball goes outside the box without touching the ground, the batsman will be declared OUT.',
      'If the ball goes outside the designated playing box without making contact with the ground, it will be given out.',
      'Matches will be played according to the fixtures.'
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
    description: 'Fast 3v3 half-court basketball with modified scoring and free throw tiebreakers.',
    rules: [
      'Tournament Format: 2 groups with 4 teams each. Group A Winner vs Group B Winner in the Final.',
      'Each team consists of 3 players. Match played on a half court.',
      'Match duration: 6 minutes total (3 minutes per half).',
      'Proper basketball kit and shoes are mandatory.',
      'Points System: 3-pointer = 2 points, 2-pointer = 1 point.',
      'The defensive team should play within the designated defensive lane.',
      'Tiebreaker: Each team gets 3 free throws. If still tied, 1 free throw each alternately until a winner is decided.'
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
    venue: 'Parking Area',
    teamSize: '4 Participants (2 Boys + 2 Girls)',
    description: 'Mixed-gender team baton relay race testing sprint speed and baton exchange precision.',
    rules: [
      'Team Composition: 2 Boys + 2 Girls are compulsory.',
      'The baton must be passed within the designated exchange zone.',
      'If the baton is dropped, the same participant must pick it up and continue the race.',
      'Participants must run in their assigned lanes and must not obstruct or interfere with other teams.',
      'The decision of the officials/judges will be final and binding.'
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
    description: 'Formal 10-minute parliamentary debate with pre-assigned topics and strict speaking time limits.',
    rules: [
      'Time duration for the whole debate is 10 minutes.',
      'Topic for the 1st round will be given 1 day prior before the event date.',
      'Topics for further rounds will be given on the spot — teams get 10 minutes for preparation.',
      'The team supporting the motion must not shift its point of view. Same applies for the opposition.',
      'If a speaker makes a statement, they must be able to provide evidence or reasons to support it.',
      'Facts presented in a debate must be accurate.',
      'Speakers may not bring up new points in a rebuttal speech.',
      'Only one speaker can speak from each team at a time.',
      'The affirmative side speaks first, followed by a response from the negative side.',
      'Each member of the opposing sides should take their turns in speaking.',
      'Each speaker is given a maximum of one minute to speak. Once time runs out, the speaker must close their speech.',
      'Interruption of the speaker is strictly prohibited.'
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
    description: 'Tactical rapid chess under 10-minute clock control with touch-move rule and tiebreaker blitz.',
    rules: [
      'Each game is 10 minutes per player, no increment.',
      'Touch-move rule applies.',
      'Illegal move results in a warning; second illegal move results in loss.',
      'If the player\'s time runs out, they lose the game.',
      'No outside help or phone use is allowed.',
      'Tiebreaker match will be 3 minutes per player.',
      'Players must download a chess clock on their phones before the match.'
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
      'Each athlete will be given 3 attempts. The best valid attempt will be considered for the final result.',
      'The shot must be put from the shoulder using one hand and must remain close to the neck/chin during the putting action.',
      'The athlete must remain inside the circle until the shot has landed. Leaving the circle before the shot lands will result in a foul.',
      'The shot must land inside the designated landing sector.',
      'The athlete must not touch the top of the stop board or the ground outside the circle during the attempt.',
      'Shot weight: Boys – 7 kg; Girls – 5 kg.'
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
    eventType: 'Group Event',
    venue: 'Main Lawn',
    teamSize: '2 Participants (1 Boy + 1 Girl)',
    description: 'Mixed doubles badminton tournament with rally scoring to 11 points and serve rotation rules.',
    rules: [
      'Team Composition: 1 Boy + 1 Girl are compulsory.',
      'First team to 11 points wins. Every rally gives 1 point.',
      'Even score → serve from the right. Odd score → serve from the left.',
      'Serve diagonally into the opponent\'s service court.',
      'If the serving team wins the rally, they get the point and continue serving. If they lose, opponents get the point and serve.',
      'At 10–10, the next point will be deuce. After that, scoring 2 more points from a single team will win the match.',
      'A shuttle landing on the line is IN.',
      'The final match will consist of 15 points, subject to time availability. If time is limited, it will be reduced to an 11-point match.',
      'There won\'t be a reserve if the shuttle touches the net and falls to the opponent\'s court.',
      'If the racket or body touches the net, the point will be scored by the opponent team.'
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
    description: 'Multi-round intellectual battle featuring Q&A Round, Digital Quiz, and Buzzer Round finals.',
    rules: [
      'Round 1 – Q&A Round: 8 teams participate with 2 members per team. Quizmaster reads questions displayed on projector. Teams select correct option on answer sheets. 10 seconds per question. 3 points per correct answer. No negative marking. Top 6 teams qualify for Round 2.',
      'Round 2 – Digital Quiz: 6 teams participate. Quiz conducted through a designated website. 10 questions per team with 15 seconds each. Question auto-changes after 15 seconds. 3 points per correct answer. No negative marking. Top 4 teams qualify for the Final Round.',
      'Round 3 – Buzzer Round: 4 teams participate. Questions asked to all four teams. Team that presses the buzzer first gets to answer. Must wait for Quizmaster\'s permission before answering. Only the acknowledged team can give the answer.',
      'If the first team gives an incorrect answer, the question may be opened to remaining teams.',
      'The team with the highest score at the end is declared the Quiz Champion.',
      'In case of a tie, a buzzer-based tiebreaker will be conducted.',
      'Team members can discuss and decide their answers in all rounds.'
    ],
    status: 'Completed',
    scheduledTime: 'Day 2 - 02:00 PM',
    pointsScale: { first: 50, second: 30, third: 20, participation: 10 }
  }
];

// Common Rules from Season 5 Rulebook (2026)
export const COMMON_RULES: string[] = [
  'Team Composition: 17 Boys + 6 Girls are compulsory per team.',
  'Reporting Time: Captains must ensure their teams report at least 30 minutes before their scheduled match. Failure to do so may result in disqualification.',
  'Misbehavior: Any misbehavior during the event will lead to the disqualification of the team.',
  'Eligibility: All participants must be enrolled as students in the college for the academic year 2026-27. Students with a dropout status or provisional admission are not eligible.',
  'Dropout Penalty: If a team member is found to be a dropout or has provisional admission, the team must either play one player short or continue without earning match points.',
  'Referees & Judges: The decision of the Referee/Judges is final and binding.',
  'Badges & Bands: Team members must wear their allotted badges/bands throughout the competition.',
  'Substitutions: In case of an emergency, a maximum of one substitution is allowed from the team only. Final decision regarding substitutions will be made by the referee/judge.',
  'Rule Adaptability: The rules are subject to change based on time and other conditions.',
  'Late Arrival Penalty: If a player arrives late, -3 points will be deducted from their team.',
  'Fight/Argument Penalty: If a player gets into a fight or serious argument with the referee or any opposition team member, -5 points will be deducted from their team.',
  'Abusive Language Penalty: If a player uses abusive language or abuses the referee or any opposition team player, -5 points will be deducted from their team.',
  'No-Show/Dropout: If a player drops out or fails to report for the scheduled game, the player will be disqualified from that particular game, and their team will also be disqualified from that game.'
];

// INITIAL TEAMS - 8 Official PHCL Season 5 Captains & Teams
export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-divesh',
    name: 'Blue Knights',
    captain: 'Divesh Subhash Rathod',
    captainImage: '/Captains/Divesh Rathod.jpg',
    captainBio: 'Powerhouse captain driving tactical strength and precision across all arena matches.',
    motto: 'Defend the Blue Knights!',
    themeColor: 'blue',
    bgGradient: 'from-blue-950/60 via-slate-900 to-slate-950',
    borderColor: 'border-blue-500/60',
    shadowColor: 'shadow-blue-500/30',
    textColor: 'text-blue-300',
    badgeSymbol: '🛡️',
    members: [
      { id: 'divesh-mem-1', name: 'Divesh Subhash Rathod', role: 'Captain', specialtyEvent: 'Box Cricket', department: 'Computer Engg', year: 'TE' },
      { id: 'divesh-mem-2', name: 'Riya Ketan Kadam', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-3', name: 'Hrugved Sitaram Salunke', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-4', name: 'Vedant Shankar Pathare', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-5', name: 'Om Sanjay Salunke', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-6', name: 'Dhruva Goraksha Mali', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-7', name: 'Pawan Naresh Thombare', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-8', name: 'Ayush Vijay Mhatre', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-9', name: 'Ritik Krishnadutta Mishra', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-10', name: 'Pranay Santosh Patil', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-11', name: 'Yash Bharat Hagawane', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-12', name: 'Triyakshaya Jagdish Mokal', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-13', name: 'Suvidha Nitin Kalekar', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-14', name: 'Drushti Dayanand Thakur', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-15', name: 'Aashish Ravi Sharma', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-16', name: 'Janhvi Deepak Jadhav', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-17', name: 'Anushka Prasad Lad', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-18', name: 'Srushti Vidyunand Ohal', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-19', name: 'Anshul Sudhir Pingale', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-20', name: 'Hitesh Pandurang Thombare', role: 'Squad Member', specialtyEvent: 'Chess', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-21', name: 'Parth Vijay Patil', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-22', name: 'Sujal Sanjay Khane', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'divesh-mem-23', name: 'Gaurang Yogesh Sonawane', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' }
    ],
    eventScores: {}
  },
  {
    id: 'team-himanshi',
    name: 'Pink Tornados',
    captain: 'Himanshi Dodtiya',
    captainImage: '/Captains/Himanshi Dodiya .jpg',
    captainBio: 'Resilient strategist rising above every challenge with fiery passion and lightning agility.',
    motto: 'Fierce Whirlwind of Victory!',
    themeColor: 'pink',
    bgGradient: 'from-pink-950/60 via-slate-900 to-slate-950',
    borderColor: 'border-pink-500/60',
    shadowColor: 'shadow-pink-500/30',
    textColor: 'text-pink-400',
    badgeSymbol: '🌪️',
    members: [
      { id: 'himanshi-mem-1', name: 'Himanshu Gharat', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-2', name: 'Varad Mhatre', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-3', name: 'Amey Patil', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-4', name: 'Abhijeet Gharat', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-5', name: 'Chetan Thombare', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-6', name: 'Vedant Gopke', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-7', name: 'Aadarsh Kammani', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-8', name: 'Siddhesh Nekam', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-9', name: 'Yash Sawant', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-10', name: 'Yash Ghadgare', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-11', name: 'Varad Mundhe', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-12', name: 'Chetan Mali', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-13', name: 'Vaishnav Surapure', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-14', name: 'Rakshita Pandit', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-15', name: 'Himanshi Dodtiya', role: 'Captain', specialtyEvent: 'Relay', department: 'IT', year: 'TE' },
      { id: 'himanshi-mem-16', name: 'Anish Khatre', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-17', name: 'Hafiz Karkar', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-18', name: 'Akansha Pant', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-19', name: 'Vishwajeet Walunj', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-20', name: 'Shruti Bandgar', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-21', name: 'Rashi Superkar', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-22', name: 'Karan Bhoir', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshi-mem-23', name: 'Sumedh Kamalakar', role: 'Squad Member', specialtyEvent: 'Chess', department: 'Not specified', year: 'Not specified' }
    ],
    eventScores: {}
  },
  {
    id: 'team-himanshu',
    name: 'Black Hawks',
    captain: 'Himanshu Mane',
    captainImage: '/Captains/Himanshu Mane.jpg',
    captainBio: 'Relentless tactician commanding the frontline with fearless intensity and grit.',
    motto: 'Silent, Deadly, Unstoppable!',
    themeColor: 'black',
    bgGradient: 'from-zinc-950 via-slate-900 to-black',
    borderColor: 'border-zinc-700/80',
    shadowColor: 'shadow-zinc-700/20',
    textColor: 'text-slate-200',
    badgeSymbol: '🥷',
    members: [
      { id: 'himanshu-mem-1', name: 'Himanshu Mane', role: 'Captain', specialtyEvent: 'Futsal', department: 'Mechanical Engg', year: 'BE' },
      { id: 'himanshu-mem-2', name: 'Viraj', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-3', name: 'Kiran', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-4', name: 'Manthan Tupe', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-5', name: 'Dilesh Borle', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-6', name: 'Prathamesh Patil', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-7', name: 'Pratik Munde', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-8', name: 'Pranay Pawar', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-9', name: 'Atharva Kadam', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-10', name: 'Diksha Sudam Tawale', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-11', name: 'Anuj Rot Kar', role: 'Squad Member', specialtyEvent: 'Chess', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-12', name: 'Tanay Shetye', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-13', name: 'Tanvi Dhaware', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-14', name: 'Swapnil Patil', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-15', name: 'Aarya Naik', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-16', name: 'Mihal Shrikrinde', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-17', name: 'Sammuddhi Pimpare', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-18', name: 'Sharanya Jadhav', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-19', name: 'Amit Sing', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-20', name: 'Mayuresh Patil', role: 'Squad Member', specialtyEvent: 'Shot put', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-21', name: 'Advait Kshirsagar', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-22', name: 'Aditya Mategar', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'himanshu-mem-23', name: 'Mohammad Arman Rehan Khan', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' }
    ],
    eventScores: {}
  },
  {
    id: 'team-junaid',
    name: 'Green Vipers',
    captain: 'Junaid Shabir',
    captainImage: '/Captains/Junaid Shabir.jpg',
    captainBio: 'Calculated leader orchestrating squad synergy and high-speed dominance.',
    motto: 'Strike Swift, Strike True!',
    themeColor: 'green',
    bgGradient: 'from-emerald-950/60 via-slate-900 to-slate-950',
    borderColor: 'border-emerald-500/60',
    shadowColor: 'shadow-emerald-500/30',
    textColor: 'text-emerald-400',
    badgeSymbol: '🐍',
    members: [
      { id: 'junaid-mem-1', name: 'Amir Khan', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-2', name: 'Atharva Mhatre', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-3', name: 'Prachit Kondake', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-4', name: 'Siddesh Patil', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-5', name: 'Aryan Mhatre', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-6', name: 'Rudra', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-7', name: 'Sunny Sharma', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-8', name: 'Athrav Rathod', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-9', name: 'Shreyash', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-10', name: 'Mehvish', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-11', name: 'Adarsh Jadhav', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-12', name: 'Arya Karpe', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-13', name: 'Suman Ghotkar', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-14', name: 'Mehak', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-15', name: 'Mansoor Malik', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-16', name: 'Nishikant', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-17', name: 'Sakshad Rathod', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-18', name: 'Rayess Dar', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-19', name: 'Paras Berwadkar', role: 'Squad Member', specialtyEvent: 'Chess', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-20', name: 'Mhatre Yogesh', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-21', name: 'Junaid Shabir', role: 'Captain', specialtyEvent: 'Basketball', department: 'ECS', year: 'BE' },
      { id: 'junaid-mem-22', name: 'Aditi Mohit', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'junaid-mem-23', name: 'Shravani', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' }
    ],
    eventScores: {}
  },
  {
    id: 'team-kartiki',
    name: 'Red Snappers',
    captain: 'Kartiki Vaibhav Jambekar',
    captainImage: '/Captains/Kartiki Jambekar.jpg',
    captainBio: 'Tenacious athlete inspiring unmatched team unity and peak performance.',
    motto: 'Power, Passion, Supreme Dominance!',
    themeColor: 'red',
    bgGradient: 'from-red-950/60 via-slate-900 to-slate-950',
    borderColor: 'border-red-500/60',
    shadowColor: 'shadow-red-500/30',
    textColor: 'text-red-400',
    badgeSymbol: '👑',
    members: [
      { id: 'kartiki-mem-1', name: 'Rishabh Santosh Musale', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-2', name: 'Raj Jitendra Pande', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-3', name: 'Ninad Roshan Pawar', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-4', name: 'Kartiki Vaibhav Jambekar', role: 'Captain', specialtyEvent: 'Relay', department: 'Civil Engg', year: 'SE' },
      { id: 'kartiki-mem-5', name: 'Tushar Nilesh Devghare', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-6', name: 'Rugved Ajit Patil', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-7', name: 'Piyush Sanjay Thakare', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-8', name: 'Shaurya Vicky Rane', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-9', name: 'Mauli Jayanta Mehetar', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-10', name: 'Apurva Avadhut Bhumkar', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-11', name: 'Hinal Ravindra Makwana', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-12', name: 'Saish Rupesh Chavakar', role: 'Squad Member', specialtyEvent: 'Chess', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-13', name: 'Soham Manoj Wayangankar', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-14', name: 'Arya Ganesh Jadhav', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-15', name: 'Sai Yogesh Mahalkar', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-16', name: 'Pravin Ashok Wani', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-17', name: 'Rushikesh Amresh Koli', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-18', name: 'Harshvardhan Satish Dapal', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-19', name: 'Abhinav Umakant Shelar', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-20', name: 'Princeraj Mahesh Vishwakarma', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-21', name: 'Smit Rushikant Bhagat', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-22', name: 'Kripa Sandesh Bhoir', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'kartiki-mem-23', name: 'Satyam Pandit Mhatre', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' }
    ],
    eventScores: {}
  },
  {
    id: 'team-mayur',
    name: 'White Dragons',
    captain: 'Mayur Mhatre',
    captainImage: '/Captains/Mayur Mhatre.jpg',
    captainBio: 'Fierce competitive driver pushing squad endurance to the maximum limit.',
    motto: 'Pure Power, Radiant Glory!',
    themeColor: 'white',
    bgGradient: 'from-slate-900 via-slate-800 to-slate-950',
    borderColor: 'border-white/60',
    shadowColor: 'shadow-white/20',
    textColor: 'text-white',
    badgeSymbol: '🐉',
    members: [
      { id: 'mayur-mem-1', name: 'Mayur Mhatre', role: 'Captain', specialtyEvent: 'Box Cricket', department: 'Automobile', year: 'TE' },
      { id: 'mayur-mem-2', name: 'Jay Bandhankar', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-3', name: 'Aaryan Shinde', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-4', name: 'Kalpesh Thale', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-5', name: 'Pratik Yadnik', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-6', name: 'Abraham Khasdar', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-7', name: 'Hari Om Paswan', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-8', name: 'SriLaxmi V. S', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-9', name: 'Trupti Deshmukh', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-10', name: 'Priyanshu Rane', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-11', name: 'Navneet Yadav', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-12', name: 'Shashwat Parida', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-13', name: 'Mohit Baikar', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-14', name: 'Prachi Patil', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-15', name: 'Magnus Francis', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-16', name: 'Harsh Raghuvanshi', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-17', name: 'Dhananjay Ahire', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-18', name: 'Harsh Patil', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-19', name: 'Panjal Joshi', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-20', name: 'Vardagauri Mokal', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-21', name: 'Nikhil Patnaik', role: 'Squad Member', specialtyEvent: 'Chess', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-22', name: 'Yash Shelke', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'mayur-mem-23', name: 'Amruta Dhepe', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' }
    ],
    eventScores: {}
  },
  {
    id: 'team-saloni',
    name: 'Grey Gators',
    captain: 'Saloni Balu Agalawe',
    captainImage: '/Captains/Saloni Agalawe.jpg',
    captainBio: 'Master strategist combining sharp intellect, rapid reflexes, and endurance.',
    motto: 'Steely Resolve, Unyielding Honor!',
    themeColor: 'grey',
    bgGradient: 'from-slate-900 via-zinc-900 to-slate-950',
    borderColor: 'border-slate-400/60',
    shadowColor: 'shadow-slate-400/20',
    textColor: 'text-slate-300',
    badgeSymbol: '⚔️',
    members: [
      { id: 'saloni-mem-1', name: 'Saloni Balu Agalawe', role: 'Captain', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-2', name: 'Bhuikot Om Sanjay', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-3', name: 'Ugale Aditi Sharad', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-4', name: 'Shetty Sanjnya Sanjay', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-5', name: 'Aditya Sameer Nalawade', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-6', name: 'Sukhadede Palak Omkar', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-7', name: 'Chatale Rajdeep Bhausaheb', role: 'Squad Member', specialtyEvent: 'Chess', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-8', name: 'Varad Dhadave', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-9', name: 'Bhusari Tejas Santosh', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-10', name: 'Anami MD Sidique Jawed Alam', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-11', name: 'Modi Ayush Vinod', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-12', name: 'Vichare Gitesh Chandrashekhar', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-13', name: 'Koli Prem Ranjay', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-14', name: 'Dalvi Sharad Ashok', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-15', name: 'Bhagat Raj Prakash', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-16', name: 'More Ritesh Vishwas', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-17', name: 'Solanki Manav Deepak', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-18', name: 'More Tejas Rajendra', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-19', name: 'Kadam Lahu Ramchandra', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-20', name: 'Desai Atharva Sachin', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-21', name: 'Sutar Vaishnavi Ravindra', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-22', name: 'Khole Kshitija Ramesh', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'saloni-mem-23', name: 'Tandlekar Sahil Suresh', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' }
    ],
    eventScores: {}
  },
  {
    id: 'team-shreya',
    name: 'Violet Vikings',
    captain: 'Shreya Sathe',
    captainImage: '/Captains/Shreya Sathe .jpg',
    captainBio: 'Steely defense and surgical precision defending Spartan supremacy.',
    motto: 'Defend the Shield, Rule the Game!',
    themeColor: 'violet',
    bgGradient: 'from-violet-950/60 via-slate-900 to-slate-950',
    borderColor: 'border-violet-500/60',
    shadowColor: 'shadow-violet-500/30',
    textColor: 'text-violet-400',
    badgeSymbol: '🛡️',
    members: [
      { id: 'shreya-mem-1', name: 'Shreya Sathe', role: 'Captain', specialtyEvent: 'Debate', department: 'IT', year: 'BE' },
      { id: 'shreya-mem-2', name: 'Akash Nichinde', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-3', name: 'Rugved Patil', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-4', name: 'Atharv Ketkar', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-5', name: 'Harash Damale', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-6', name: 'Jatin Palvi', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-7', name: 'Prasad Gudekar', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-8', name: 'Aditya Mali', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-9', name: 'Naitik Yerunkar', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-10', name: 'Ayush', role: 'Squad Member', specialtyEvent: 'Futsal', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-11', name: 'Manali', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-12', name: 'Barsha', role: 'Squad Member', specialtyEvent: 'Relay', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-13', name: 'Jagrut', role: 'Squad Member', specialtyEvent: 'Box Cricket', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-14', name: 'Yashasvi', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-15', name: 'Nidhi', role: 'Squad Member', specialtyEvent: 'Quiz', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-16', name: 'Tanvi Singh', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-17', name: 'Pranjal', role: 'Squad Member', specialtyEvent: 'Debate', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-18', name: 'Shivam', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-19', name: 'Saiganesh', role: 'Squad Member', specialtyEvent: 'Shotput', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-20', name: 'Mayur', role: 'Squad Member', specialtyEvent: 'Chess', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-21', name: 'Kuldeep', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-22', name: 'Aman', role: 'Squad Member', specialtyEvent: 'Basketball', department: 'Not specified', year: 'Not specified' },
      { id: 'shreya-mem-23', name: 'Akansha', role: 'Squad Member', specialtyEvent: 'Badminton', department: 'Not specified', year: 'Not specified' }
    ],
    eventScores: {}
  }
];

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

  const hasStartedLeaderboard = list.some(item => item.totalPoints > 0);

  if (!hasStartedLeaderboard) {
    list.forEach((item) => {
      item.rank = 0;
    });
    return list;
  }

  // Assign ranks only after the leaderboard has officially started.
  list.forEach((item, index) => {
    item.rank = index + 1;
  });

  return list;
}

export interface TeamVisualTheme {
  bannerGradient: string;
  bannerTextColor: string;
  glowColor: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
}

export function getTeamVisualTheme(team?: Partial<Team> | { name?: string; teamName?: string; captain?: string; themeColor?: string }): TeamVisualTheme {
  if (!team) {
    return {
      bannerGradient: 'from-amber-500 via-orange-600 to-[#E87A2D]',
      bannerTextColor: 'text-white',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      borderColor: 'border-amber-500/60',
      textColor: 'text-amber-400',
      accentColor: '#E87A2D'
    };
  }

  const rawName = (((('teamName' in team && team.teamName) || team.name || '') + '').toLowerCase());
  const rawCapt = ((team.captain || '') + '').toLowerCase();
  const rawTheme = (team.themeColor || '').toLowerCase();
  const combined = `${rawName} ${rawCapt} ${rawTheme}`;

  // 1. Blue (Divesh Rathod / Blue Knights / blue)
  if (combined.includes('blue') || combined.includes('divesh') || combined.includes('knight')) {
    return {
      bannerGradient: 'from-blue-600 via-cyan-600 to-blue-900',
      bannerTextColor: 'text-white',
      glowColor: 'rgba(37, 99, 235, 0.6)',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      borderColor: 'border-blue-500/60',
      textColor: 'text-blue-300',
      accentColor: '#2563eb'
    };
  }

  // 2. Green (Junaid Shabir / Green Vipers / green)
  if (combined.includes('green') || combined.includes('junaid') || combined.includes('janaid') || combined.includes('viper')) {
    return {
      bannerGradient: 'from-emerald-600 via-green-600 to-emerald-800',
      bannerTextColor: 'text-white',
      glowColor: 'rgba(16, 185, 129, 0.6)',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      borderColor: 'border-emerald-500/60',
      textColor: 'text-emerald-400',
      accentColor: '#10b981'
    };
  }

  // 3. Red (Kartiki Jambekar / Red Snappers / red)
  if (combined.includes('red') || combined.includes('kartiki') || combined.includes('snapper')) {
    return {
      bannerGradient: 'from-red-600 via-rose-600 to-red-800',
      bannerTextColor: 'text-white',
      glowColor: 'rgba(239, 68, 68, 0.6)',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
      borderColor: 'border-red-500/60',
      textColor: 'text-red-400',
      accentColor: '#ef4444'
    };
  }

  // 4. Grey / Gray (Saloni Agalawe / Grey Knights / grey / gray)
  if (combined.includes('grey') || combined.includes('gray') || combined.includes('saloni')) {
    return {
      bannerGradient: 'from-slate-500 via-zinc-600 to-slate-700',
      bannerTextColor: 'text-white',
      glowColor: 'rgba(148, 163, 184, 0.6)',
      badgeBg: 'bg-slate-500/25 text-slate-200 border-slate-400/40',
      borderColor: 'border-slate-400/60',
      textColor: 'text-slate-300',
      accentColor: '#94a3b8'
    };
  }

  // 5. Pink (Himanshi Dodiya / Pink Tornado / pink)
  if (combined.includes('pink') || combined.includes('himanshi') || combined.includes('tornado') || combined.includes('rose')) {
    return {
      bannerGradient: 'from-pink-500 via-rose-500 to-pink-700',
      bannerTextColor: 'text-white',
      glowColor: 'rgba(236, 72, 153, 0.6)',
      badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
      borderColor: 'border-pink-500/60',
      textColor: 'text-pink-400',
      accentColor: '#ec4899'
    };
  }

  // 6. White (Mayur Mhatre / White Dragons / white)
  if (combined.includes('white') || combined.includes('mayur') || combined.includes('dragon')) {
    return {
      bannerGradient: 'from-slate-100 via-white to-slate-200',
      bannerTextColor: 'text-slate-950 font-black',
      glowColor: 'rgba(255, 255, 255, 0.65)',
      badgeBg: 'bg-white/20 text-white border-white/50',
      borderColor: 'border-white/70',
      textColor: 'text-white',
      accentColor: '#ffffff'
    };
  }

  // 7. Black (Himanshu Mane / Black Shadows / black)
  if (combined.includes('black') || combined.includes('himanshu') || combined.includes('himashu') || combined.includes('shadow')) {
    return {
      bannerGradient: 'from-zinc-950 via-slate-900 to-black',
      bannerTextColor: 'text-white',
      glowColor: 'rgba(255, 255, 255, 0.3)',
      badgeBg: 'bg-zinc-800/80 text-zinc-200 border-zinc-600',
      borderColor: 'border-zinc-700',
      textColor: 'text-zinc-300',
      accentColor: '#3f3f46'
    };
  }

  // 8. Violet / Purple (Shreya Sathe / Violet Spartans / violet / purple)
  if (combined.includes('violet') || combined.includes('purple') || combined.includes('shreya') || combined.includes('spartan') || combined.includes('vilote')) {
    return {
      bannerGradient: 'from-violet-600 via-purple-600 to-indigo-800',
      bannerTextColor: 'text-white',
      glowColor: 'rgba(139, 92, 246, 0.6)',
      badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      borderColor: 'border-violet-500/60',
      textColor: 'text-violet-400',
      accentColor: '#8b5cf6'
    };
  }

  // Fallback Amber / Orange
  return {
    bannerGradient: 'from-amber-500 via-orange-600 to-[#E87A2D]',
    bannerTextColor: 'text-white',
    glowColor: 'rgba(245, 158, 11, 0.55)',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    borderColor: 'border-amber-500/60',
    textColor: 'text-amber-400',
    accentColor: '#E87A2D'
  };
}
