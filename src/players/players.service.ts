import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Player } from './interfaces/player.interface';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {}

  async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const foundedPlayer = await this.playerModel.findOne({ email }).exec();

    if (foundedPlayer) {
      await this.updatePlayer(createPlayerDTO);
    } else {
      await this.createPlayer(createPlayerDTO);
    }
  }

  async searchAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async searchPlayerByEmail(email: string): Promise<Player> {
    const foundedPlayer = await this.playerModel.findOne({ email }).exec();

    if (!foundedPlayer) {
      throw new NotFoundException(`Player with email ${email} not founded!`);
    }

    return foundedPlayer;
  }

  async deletePlayerByEmail(email: string): Promise<any> {
    return await this.playerModel.remove({ email }).exec();
  }

  private async updatePlayer(
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDTO.email },
        { $set: createPlayerDTO },
      )
      .exec();
  }

  private async createPlayer(
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDTO);
    return await createdPlayer.save();

    this.logger.log(`createPlayer: ${JSON.stringify(createPlayerDTO)}`);
  }
}
