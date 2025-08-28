import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Blog } from "./Blog";
import { Comment } from "./Comments";
@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

   @OneToMany(() => Blog, (blog) => blog.author)
    blogs!: Blog[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments!: Comment[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}