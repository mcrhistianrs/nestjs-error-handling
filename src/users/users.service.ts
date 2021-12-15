import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import {UnauthorizedError} from '../errors/UnauthorizedError'; 


@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data
    });
  }

  findAll() {
    throw new UnauthorizedException("errro no....")
    
    //throw new UnauthorizedError('Custom message Service...')
    return this.prisma.user.findMany();
  }


}
