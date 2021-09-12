import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'keys' })
export class Keys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column({ nullable: true })
  org_id: string;

  @Column()
  project_id: number;
}
