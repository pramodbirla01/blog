import { PrimaryGeneratedColumn, Entity, Column, UpdateDateColumn , CreateDateColumn, ManyToOne } from "typeorm";
import { Blog } from "./Blog";
import { User } from "./User";

@Entity("Comments")
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({type:"text"})
    content!: string;

    @ManyToOne(()=>Blog, (blog)=>blog.comments, {onDelete:"CASCADE"})
    blog!: Blog;

    @ManyToOne(()=>User, (user)=>user.comments, {onDelete:"CASCADE"})
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}