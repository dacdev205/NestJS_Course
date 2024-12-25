import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  features: string[];

  @IsString()
  @IsNotEmpty()
  specifications: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images: string[];

  @IsString()
  @IsNotEmpty()
  warranty: string;

  @IsString()
  @IsOptional()
  deliveryInfo?: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @IsString()
  @IsNotEmpty()
  url_source: string;
}
