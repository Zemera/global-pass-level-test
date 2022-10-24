import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Book } from "./book.entity";

@Entity('author')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string; // название 

    @OneToMany(
        type => Book,
        book => book.author,
    )
    books: Book[];

    constructor(fullName) {
        this.fullName = fullName
    }
}