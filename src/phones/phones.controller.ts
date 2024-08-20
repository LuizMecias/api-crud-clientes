import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Get('/list/:id')
  async listAllById(@Param('id') id: number): Promise<Phone[]> {
    return this.phonesService.listAllById(id);
  }

  @Post('/register')
  async cregister(@Body() data: CreatePhoneDto): Promise<ResultadoDto> {
    return this.phonesService.register(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePhoneDto,
  ): Promise<ResultadoDto> {
    return this.phonesService.update(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<ResultadoDto> {
    return this.phonesService.delete(id);
  }

  @Get('/search/:id')
  async search(
    @Param('id') id: number,
    @Query('searchInput') searchInput: string,
  ): Promise<Phone[]> {
    return this.phonesService.search(id, searchInput);
  }
}
