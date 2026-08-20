import { Team, EventResult, MatchFixture, INITIAL_TEAMS } from './phcl-data';

// Server-side in-memory cache for seamless fallback when MongoDB instance is offline or during initial startup
export interface StoreState {
  teams: Team[];
  results: EventResult[];
  fixtures: MatchFixture[];
}

export const globalStore: StoreState = {
  teams: [...INITIAL_TEAMS],
  results: [],
  fixtures: []
};

