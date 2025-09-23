import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  LAND = 'LAND',
  COMMERCIAL = 'COMMERCIAL',
}

@Entity({ name: 'properties' })
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  type: PropertyType;

  // --- CAMPO NOVO ADICIONADO AQUI ---
  // 'text[]' é o tipo para um array de strings no PostgreSQL
  @Column('text', { array: true, nullable: true })
  imageUrls: string[];
}

