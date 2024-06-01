import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Series } from './entities/serie.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const { titulo } = createSeriesDto;

    const existingSeries = await this.seriesRepository.findOne({ where: { titulo } });

    if (existingSeries) {
      throw new ConflictException('La serie ya existe');
    }

    return this.seriesRepository.save(createSeriesDto);
  }

  async findAll(): Promise<Series[]> {
    return this.seriesRepository.find();
  }

  async findOne(id: number): Promise<Series> {
    const serie = await this.seriesRepository.findOne({ where: { id } });

    if (!serie) {
      throw new NotFoundException('Serie no encontrada');
    }

    return serie;
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    const serie = await this.findOne(id);

    return this.seriesRepository.save({
      ...serie,
      ...updateSeriesDto,
    });
  }

  async remove(id: number): Promise<void> {
    const serie = await this.findOne(id);

    await this.seriesRepository.remove(serie);
  }
}
