import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginInput, RegisterInput } from './dto/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // ← Corrigir para usar input
  async register(input: RegisterInput) {
    const { email, password, name } = input;
    
    // Verificar se usuário já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const rounds = this.config.get('BCRYPT_ROUNDS') || 12;
    const hashedPassword = await bcrypt.hash(password, Number(rounds));

    // Criar usuário
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Registrar login diário
    await this.registerDailyLogin(user.id);

    // Gerar token
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        totalXp: user.totalXp,
        currentLevel: user.currentLevel,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  // ← Corrigir para usar input
  async login(input: LoginInput) {
    const { email, password } = input;
    
    // Verificar se usuário existe
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Registrar login diário (agora com try/catch)
    await this.registerDailyLogin(user.id);

    // Gerar token
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        totalXp: user.totalXp,
        currentLevel: user.currentLevel,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  private generateToken(userId: number, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }

  private async registerDailyLogin(userId: number) {
    try {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0]; // Formato: 2025-06-10

      // Verificar se já existe login hoje
      const existingLogin = await this.prisma.dailyLogin.findFirst({
        where: {
          userId,
          loginDate: new Date(todayString),
        },
      });

      // Se não existe, criar novo registro
      if (!existingLogin) {
        await this.prisma.dailyLogin.create({
          data: {
            userId,
            loginDate: new Date(todayString),
          },
        });
      }
    } catch (error) {
      // Se der erro, não quebra o login - apenas loga o erro
      console.log('Erro ao registrar login diário:', error.message);
    }
  }

  // Método para query me
  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        totalXp: true,
        currentLevel: true,
        streak: true,
        hearts: true,
        gems: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        // NÃO incluir password por segurança
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }
}