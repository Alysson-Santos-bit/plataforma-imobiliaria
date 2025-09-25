import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Importa o guarda de autenticação

@Controller('dashboard') // Define a rota base como /dashboard
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats') // Define a sub-rota como /stats, resultando em GET /dashboard/stats
  @UseGuards(JwtAuthGuard) // Protege esta rota, exigindo login
  getDashboardStats() {
    return this.dashboardService.getStats();
  }
}