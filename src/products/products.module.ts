import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { BrandSchema } from './schemas/brand.schema';
import { CategorySchema } from './schemas/category.schema';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Producto', schema: ProductSchema },
      { name: 'Marca', schema: BrandSchema },
      { name: 'Categoria', schema: CategorySchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
