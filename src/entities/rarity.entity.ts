import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Rarity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public label: string;

  @OneToMany(() => Card, (card) => card.rarity, { eager: false })
  public cards: Card[];
}
