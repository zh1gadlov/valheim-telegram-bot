import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { ContentUserCommentEntity } from './content-user-comments.entity';

@Entity({
  name: 'content'
})
export class ContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  size: number;

  @OneToMany(() => ContentUserCommentEntity, (comment) => comment.content)
  @JoinColumn()
  contentComment: ContentUserCommentEntity[];
}
