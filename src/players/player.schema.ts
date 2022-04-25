import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String },
    ranking: { type: String },
    rankingPosition: { type: Number },
    urlPlayerImage: { type: String },
  },
  {
    timestamps: true,
    collection: 'PLAYERS',
  },
);
