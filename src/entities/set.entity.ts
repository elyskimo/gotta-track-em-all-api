import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';

export interface Label {
  eng: string;
}

@Entity()
export class Set {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public code: string;

  @Column()
  public count: number;

  @Column()
  public releaseDate: Date;

  @Column({ type: 'json' })
  public label: Label;

  @Column('text', { array: true })
  public packs: string[];

  @OneToMany(() => Card, (card) => card.set)
  public cards: Card[];

  //"code": "A3",
  //   "releaseDate": "2025-04-30",
  //   "count": 239,
  //   "label": {
  //     "en": "Celestial Guardians"
  //   },
  //   "packs": ["Lunala", "Solgaleo"]
}
