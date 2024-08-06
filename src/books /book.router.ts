import express from "express";
import type { Request, Response } from "express";
import BookService from "./book.service";

export const bookRouter = express.Router();

bookRouter.get("/", async (request: Request, response: Response) => {
    try {
        const books = await BookService.listBooks();
        return response.status(200).json(books);
    } catch (error: any) {
        return response.status(500).json({ message: error.message });
    }
});

bookRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const book = await BookService.getBook(id);
        if (book) {
            return response.status(200).json(book);
        }
        return response.status(404).json({ message: "Book could not be found" });
    } catch (error: any) {
        return response.status(500).json({ message: error.message });
    }
});
