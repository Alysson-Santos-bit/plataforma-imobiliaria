import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referral } from './referrals.entity';
import { CreateReferralDto } from './dto/create-referrals.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReferralsService {
  constructor(
    @InjectRepository(Referral)
    private readonly referralRepository: Repository<Referral>,
  ) {}

  // Cria uma nova indicação associada ao usuário logado
  async create(createReferralDto: CreateReferralDto, referrer: User): Promise<Referral> {
    const newReferral = this.referralRepository.create({
      ...createReferralDto,
      referrerId: referrer.id, // Associa o ID do usuário que indicou
      referrer: referrer,
    });

    return this.referralRepository.save(newReferral);
  }

  // Lista todas as indicações feitas por um usuário específico
  async findAllByUser(referrerId: string): Promise<Referral[]> {
    return this.referralRepository.find({
      where: { referrerId },
      order: { createdAt: 'DESC' }, // Ordena da mais nova para a mais antiga
    });
  }

  // (No futuro, podemos adicionar métodos para o admin ver todas as indicações)
}
