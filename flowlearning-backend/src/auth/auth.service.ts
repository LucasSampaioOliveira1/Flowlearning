import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterInput, LoginInput } from './dto/auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

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
        totalXp: 0,
        currentLevel: 1,
        hearts: 5,
        gems: 0,
        streak: 0,
      },
    });

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
    return this.jwt.sign(
      { sub: userId, email },
      { 
        secret: this.config.get('JWT_SECRET') || 'fallback-secret-key',
        expiresIn: '7d' 
      }
    );
  }

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
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }
}