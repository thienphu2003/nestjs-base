import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    const myPlaintextPassword = password;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    return hash;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const hashPassword = await this.hashPassword(password);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashPassword
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    return await this.userModel.findOne({
      _id: id
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    return await this.userModel.deleteOne({ _id: id });
  }
}
