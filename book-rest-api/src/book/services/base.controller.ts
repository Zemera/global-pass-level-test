import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseService } from './base.service';

@Controller()
export class BaseController<T> {
  service: BaseService<T, DeepPartial<T>, DeepPartial<T>>;

  constructor(_service: BaseService<T, DeepPartial<T>, DeepPartial<T>>) {
    this.service = _service;
  }

  @Get()
  public async findAll(): Promise<T[]> {
    try {
      return this.service.findAll()
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<T> {
    try {
      return this.service.fineOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  public async post(@Body() newItem: DeepPartial<T>): Promise<T> {
    try {
      const output = await this.service.create(newItem);
      return output;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  public async uptaed(
    @Body() updateItem: DeepPartial<T>, @Param('id') id: number): Promise<T> {
    try {
      const output = await this.service.update(id, updateItem);
      return output;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<any> {
    try {
      const output = await this.service.remove(id);
      return output;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
