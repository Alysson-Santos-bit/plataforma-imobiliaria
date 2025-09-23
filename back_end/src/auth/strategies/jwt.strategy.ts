import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      // Extrai o token do cabeçalho "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Garante que tokens expirados sejam rejeitados
      ignoreExpiration: false,
      // A mesma chave secreta usada para criar o token. Use variáveis de ambiente!
      secretOrKey: process.env.JWT_SECRET || 'suaChaveSecretaSuperDificil',
    });
  }

  /**
   * Este método é chamado automaticamente pelo Passport após o token ser
   * decodificado e verificado com sucesso.
   * @param payload O conteúdo que foi colocado dentro do token no momento do login.
   * @returns O objeto do usuário, que será anexado ao objeto `request` (req.user).
   */
  async validate(payload: { sub: string; email: string }) {
    // Podemos usar o ID do usuário (sub) para buscar o objeto completo no banco,
    // garantindo que o usuário ainda existe.
    const user = await this.usersService.findById(payload.sub);

    // O que for retornado aqui ficará disponível em `req.user` nas rotas protegidas.
    return user;
  }
}