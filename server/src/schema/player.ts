export const playerSchema = `
  type Player {
    id: ID!
    email: String!
    displayName: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    stats: PlayerStats!
    recentMatches(limit: Int = 10): [MatchSession!]!
  }

  type PlayerStats {
    totalMatches: Int!
    bestTimeEasy: Int
    bestTimeNormal: Int
    bestTimeHard: Int
    bestMovesEasy: Int
    bestMovesNormal: Int
    bestMovesHard: Int
    averageMovesEasy: Float
    averageMovesNormal: Float
    averageMovesHard: Float
  }

  type LeaderboardEntry {
    player: Player!
    bestTime: Int!
    bestMoves: Int!
  }

  extend type Query {
    me: Player!
    leaderboard(difficulty: Difficulty!, limit: Int = 10): [LeaderboardEntry!]!
  }
`;
