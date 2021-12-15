import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data
    });
  }

  findAll() {
    throw new UnauthorizedException("erro no listar.")
  }


}
