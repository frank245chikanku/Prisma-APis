import { db } from "../utils/db.server";
import type { Author } from  "../author/author.service"

type BookRead = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
};

class BookService {
    async listBooks(): Promise<BookRead[]> {
        return db.book.findMany({
            select: {
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                authorId: true,
            },
        });
    }

    async getBook(id: number): Promise<BookRead | null> {
        return db.book.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
               author: {
                select: {
                    id: true,
                    firstName: true,  
                    lastName: true,
                }
               }
                 
            },
        });
    }
}

export default new BookService();
