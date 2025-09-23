import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { CreateReferralDto } from './dto/create-referrals.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // Protege todas as rotas de indicações
@Controller('referrals') // Todas as rotas aqui começarão com /referrals
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  // Rota para um usuário criar uma nova indicação
  @Post()
  create(@Body() createReferralDto: CreateReferralDto, @Request() req) {
    // req.user contém os dados do usuário logado, injetados pelo JwtAuthGuard
    const referrer = req.user;
    return this.referralsService.create(createReferralDto, referrer);
  }

  // Rota para um usuário ver as suas próprias indicações
  @Get()
  findAllByUser(@Request() req) {
    const referrerId = req.user.id;
    return this.referralsService.findAllByUser(referrerId);
  }
}
