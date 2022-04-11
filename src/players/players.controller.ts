import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createOrUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createOrUpdatePlayer(createPlayerDTO);
  }

  @Get()
  async searchPlayers(
    @Query('email') email: string,
  ): Promise<Player[] | Player> {
    if (email) {
      return await this.playersService.searchPlayerByEmail(email);
    } else {
      return await this.playersService.searchAllPlayers();
    }
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playersService.deletePlayerByEmail(email);
  }
}
