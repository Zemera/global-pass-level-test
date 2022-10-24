import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { Author } from "./author.entity";
import { Language } from "./language.entity";

@Entity('book')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; // название 

    @ManyToOne(
        type => Author,
        author => author.books,
        {cascade:true}
    )
    author: Author ; // автор

    @Column({type:'text'})
    description: string; //описание 

    @Column()
    pageCount: number; // число страниц 

    @ManyToOne(
        type => Language,
        language => language.books,
        {cascade:true}
    )
    lang: Language ; // язык 

    @Column({nullable:true})
    genre: string; //  жанр 

}