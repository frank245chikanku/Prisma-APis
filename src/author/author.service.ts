import { db } from "../utils/db.server";


 export type Author = { 
    id: number; 
    firstName: string;  
    lastName: string; 
}; 

class AuthorService {
    static async listAuthors(): Promise<Author[]> {
        return db.author.findMany({
            select: {
                id: true, 
                firstName: true, 
                lastName: true,  
            },
        });
    }

    static async getAuthor(id: number): Promise<Author | null> {
        return db.author.findUnique({
            where: { 
                id,
            }, 
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        });
    }

    static async createAuthor(
        author: Omit<Author, "id">
    ): Promise<Author> {
        const { firstName, lastName } = author;
        return db.author.create({
            data: {
                firstName,
                lastName,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        });
    }

    static async updateAuthor(
        author: Omit<Author, "id">, 
        id: number
    ): Promise<Author> {
        const { firstName, lastName } = author;
        return db.author.update({
            where: {
                id,
            },
            data: {
                firstName,
                lastName,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        });
    }

    static async deleteAuthor(id: number): Promise<void> {
        await db.author.delete({
            where: {
                id,
            },
        });
    }
}

export default AuthorService;
