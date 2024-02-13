import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'user'
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string
}
