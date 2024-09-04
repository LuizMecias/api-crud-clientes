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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  async listAll(): Promise<Product[]> {
    return this.productsService.listAll();
  }

  @Post('register')
  async register(@Body() data: CreateProductDto): Promise<ResultadoDto> {
    return this.productsService.register(data);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProductDto,
  ): Promise<ResultadoDto> {
    return this.productsService.update(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<ResultadoDto> {
    return this.productsService.delete(id);
  }

  @Get('search')
  async search(@Query('searchInput') searchInput: string): Promise<Product[]> {
    return this.productsService.search(searchInput);
  }
}
