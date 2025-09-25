import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getStats() {
    // No futuro, aqui você buscará os dados reais do banco de dados.
    // Por enquanto, retornamos dados de exemplo para testar a rota.
    return {
      totalUsers: 150,
      totalProperties: 42,
      monthlyRevenue: 25800,
    };
  }
}