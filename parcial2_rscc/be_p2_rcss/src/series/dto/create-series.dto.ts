import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSeriesDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo título no debe ser vacío' })
  @IsString({ message: 'El campo título debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo título no debe ser mayor a 250 caracteres',
  })
  readonly titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo sinopsis no debe ser vacío' })
  @IsString({ message: 'El campo sinopsis debe ser de tipo cadena' })
  @MaxLength(5000, {
    message: 'El campo sinopsis no debe ser mayor a 5000 caracteres',
  })
  readonly sinopsis: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo director no debe ser vacío' })
  @IsString({ message: 'El campo director debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo director no debe ser mayor a 100 caracteres',
  })
  readonly director: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo temporadas no debe ser vacío' })
  @IsNumber({}, { message: 'El campo temporadas debe ser de tipo numérico' })
  readonly temporadas: number;

  @ApiProperty({ example: '2024-04-13' })
  @IsNotEmpty({ message: 'El campo fechaEstreno no debe ser vacío' })
  @IsDateString({}, { message: 'El campo fechaEstreno debe ser de tipo fecha' })
  readonly fecha_estreno: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo categoría no debe ser vacío' })
  @IsString({ message: 'El campo categoría debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo categoría no debe ser mayor a 100 caracteres',
  })
  readonly categoria: string;
}


