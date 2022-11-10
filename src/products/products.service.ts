import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/Product';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Producto') private productModel: Model<Product>) {}

  async getAllProducts() {
    return await this.productModel.find().populate(['category', 'brand']);
  }

  async getProducts(itemPerPage: number, page: number) {
    return await this.productModel
      .find()
      .populate(['category', 'brand'])
      .limit(itemPerPage)
      .skip(page - 1);
  }

  async getProductByWord(word: string) {
    const arrId: string[] = [];
    const result = await Promise.all([
      this.productModel
        .find({ name: { $regex: word, $options: 'i' } })
        .populate(['category', 'brand']),
      this.productModel
        .find({ slug: { $regex: word, $options: 'i' } })
        .populate(['category', 'brand']),
      (
        await this.productModel.find().populate(['category', 'brand'])
      ).flatMap((product) => {
        const name: string = product.category['name'];
        const pos: number = name.toLowerCase().indexOf(word.toLowerCase());
        if (pos !== -1) {
          return product;
        }
        return [];
      }),
      (
        await this.productModel.find().populate(['category', 'brand'])
      ).flatMap((product) => {
        const name: string = product.brand['name'];
        const pos: number = name.toLowerCase().indexOf(word.toLowerCase());
        if (pos !== -1) {
          return product;
        }
        return [];
      }),
    ]);
    const arrAllProducts = result[0]
      .concat(result[1])
      .concat(result[2])
      .concat(result[3]);
    const arrFinalSearch = arrAllProducts.flatMap((producto) => {
      if (!arrId.includes(producto['_id'].toString())) {
        arrId.push(producto['_id'].toString());
        return producto;
      }
      return [];
    });

    return arrFinalSearch;
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }
}
