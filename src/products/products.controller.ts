import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/Product';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('api/productos')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':itemPerPage/:page')
  getProducts(
    @Param('itemPerPage') itemPerPage: string,
    @Param('page') page: string,
  ): Promise<Product[]> {
    return this.productService.getProducts(
      parseInt(itemPerPage),
      parseInt(page),
    );
  }

  @Get(':word')
  getProductByWord(@Param('word') word: string): Promise<any[]> {
    return this.productService.getProductByWord(word);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }
}
