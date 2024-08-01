import { db } from "../utils/db.server";

type Author = { 
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
        });
    }
}

export default AuthorService;
