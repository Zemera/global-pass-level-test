import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Book } from "./book.entity";

@Entity('language')
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string; // название 

    @OneToMany(
        type => Book,
        book => book.lang
    )
    books: Book[]

    constructor(name) {
        this.name = name;
    }
}