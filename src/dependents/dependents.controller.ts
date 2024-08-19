import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { DependentsService } from './dependents.service';
import { CreateDependentDto } from './dto/create-dependent.dto';
import { UpdateDependentDto } from './dto/update-dependent.dto';
import { Dependent } from './entities/dependent.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Controller('dependents')
export class DependentsController {
  constructor(private readonly dependentsService: DependentsService) {}

  @Get('/list/:id')
  async listAllById(@Param('id') id: number): Promise<Dependent[]> {
    return this.dependentsService.listAllById(id);
  }

  @Post('/register')
  async cregister(@Body() data: CreateDependentDto): Promise<ResultadoDto> {
    return this.dependentsService.register(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateDependentDto,
  ): Promise<ResultadoDto> {
    return this.dependentsService.update(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<ResultadoDto> {
    return this.dependentsService.delete(id);
  }

  @Get('/search/:id')
  async search(
    @Param('id') id: number,
    @Query('searchInput') searchInput: string,
  ): Promise<Dependent[]> {
    return this.dependentsService.search(id, searchInput);
  }
}
