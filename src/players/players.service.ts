import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Player } from './interfaces/player.interface';
import { CreatePlayerDTO } from './dtos/create-player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const foundedPlayer = this.players.find((player) => player.email === email);

    if (foundedPlayer) {
      await this.updatePlayer(foundedPlayer, createPlayerDTO);
    } else {
      await this.createPlayer(createPlayerDTO);
    }
  }

  async searchAllPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async searchPlayerByEmail(email: string): Promise<Player> {
    const foundedPlayer = this.players.find((player) => player.email === email);

    if (!foundedPlayer) {
      throw new NotFoundException(`Player with email ${email} not founded!`);
    }

    return foundedPlayer;
  }

  async deletePlayerByEmail(email: string) {
    const foundedPlayer = this.players.find((player) => player.email === email);

    this.players = this.players.filter(
      (player) => player.email !== foundedPlayer.email,
    );
  }

  private updatePlayer(
    foundedPlayer: Player,
    createPlayerDTO: CreatePlayerDTO,
  ): void {
    const { name } = createPlayerDTO;

    foundedPlayer.name = name;
  }

  private createPlayer(createPlayerDTO: CreatePlayerDTO): void {
    const { name, phoneNumber, email } = createPlayerDTO;

    const player: Player = {
      _id: uuid(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      rankingPosition: 1,
      urlPlayerImage: 'www.image.com/image.png',
    };

    this.logger.log(`createPlayer: ${JSON.stringify(createPlayerDTO)}`);
    this.players.push(player);
  }
}
