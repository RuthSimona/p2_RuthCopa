import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  titulo: string;

  @Column({ length: 5000 })
  sinopsis: string;

  @Column({ length: 100 })
  director: string;

  @Column()
  temporadas: number;

  @Column({ type: 'date' })
  fecha_estreno: Date;

  @Column({ length: 100 })
  categoria: string;
}

