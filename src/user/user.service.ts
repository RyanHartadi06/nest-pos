import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    return this.userRepo.save(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    this.userRepo.remove(user);
    return { message: 'Data berhasil dihapus', data: user };
  }
}
