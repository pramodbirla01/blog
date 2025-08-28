import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, OneToMany  } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comments";

@Entity('blogs')
export class Blog {
    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column({nullable:true})
    imageUrl!: string;

    @ManyToOne(()=> User,(user)=>user.blogs,{onDelete:"CASCADE"})
    author!: User;

    @OneToMany(() => Comment, (comment) => comment.blog, { cascade: true })
    comments!: Comment[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}