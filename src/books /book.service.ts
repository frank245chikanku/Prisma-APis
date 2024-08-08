import { db } from "../utils/db.server";
import type { Author } from "../author/author.service";

type BookRead = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    author: {
        id: number;
        firstName: string;
        lastName: string;
    };
};

type BookWrite = {
    title: string;
    datePublished: Date;
    isFiction: boolean;
    authorId: number;
};

class BookService {
    async createBook(book: BookWrite): Promise<BookRead> {
        const { title, isFiction, datePublished, authorId } = book;
        return db.book.create({
            data: {
                title,
                isFiction,
                datePublished,
                authorId,
            },
            select: {
                id: true,
                title: true,
                isFiction: true,
                datePublished: true,
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        }) as Promise<BookRead>;
    }

    async listBooks(): Promise<BookRead[]> {
        return db.book.findMany({
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
                    },
                },
            },
        }) as Promise<BookRead[]>;
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
                    },
                },
            },
        }) as Promise<BookRead | null>;
    }

    async updateBook(book: BookWrite, id: number): Promise<BookRead> {
        const { title, isFiction, datePublished, authorId } = book;
        return db.book.update({
            where: { id },
            data: {
                title,
                isFiction,
                datePublished,
                authorId,
            },
            select: {
                id: true,
                title: true,
                isFiction: true,
                datePublished: true,
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        }) as Promise<BookRead>;
    }

    async deleteBook(id: number): Promise<void> {
        await db.book.delete({
            where: { id },
        });
    }
}

export default new BookService();
