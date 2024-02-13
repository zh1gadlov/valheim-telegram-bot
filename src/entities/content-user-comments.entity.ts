import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ContentEntity } from './content.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'content_user_comments'
})
export class ContentUserCommentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => ContentEntity, (content) => content.id)
  @JoinColumn()
  content: ContentEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  userId: UserEntity;

  @Column()
  comment: string;
}
