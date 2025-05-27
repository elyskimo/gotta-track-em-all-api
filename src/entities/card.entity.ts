import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Label, Set } from './set.entity';
import { Rarity } from './rarity.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public slug: string;

  @Column({ type: 'json' })
  public label: Label;

  @ManyToOne(() => Set, (set) => set.cards)
  @JoinColumn({ name: 'set_id' })
  public set: Set;

  @Column()
  public number: number;

  @ManyToOne(() => Rarity, (rarity) => rarity.cards)
  @JoinColumn({ name: 'rarity_id' })
  public rarity: Rarity;

  @Column()
  public imageName: string;

  @Column('text', { array: true })
  public packs: string[];
}
