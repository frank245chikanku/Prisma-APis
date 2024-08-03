import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import  AuthorService from "./author.service";

export const authorRouter = express.Router();

// GET: List of all Authors
authorRouter.get("/", async (request: Request, response: Response) => {
    try {
        const authors = await AuthorService.listAuthors();
        return response.status(200).json(authors);
    } catch (error: any) {
        return response.status(500).json({ message: error.message });
    }
});

// GET: A single author by ID
authorRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const author = await AuthorService.getAuthor(id);  
        if (author) { 
            return response.status(200).json(author); 
        }
        return response.status(404).json({ message: "Author could not be found" });
    } catch (error: any) {
        return response.status(500).json({ message: error.message }); 
    }
});
// POST: Create a Author 
// Params: firstName, lastName 
authorRouter.post(
    "/", 
    body("firstName").isString(), 
    body("lastName").isString(),  
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        try{
            const author = request.body 
            const newAuthor = await AuthorService.createAuthor(author)
            return response.status(201).json(newAuthor)
        }catch(error:any) {

        }

        }

); 
// PUT: Updating an Author 
// params: firstName, lastName 
authorRouter.put(
    "/:id", 
    body("firstName").isString(), 
    body("lastName").isString(), 
    async (request: Request, response: Response) => {
        const errors = validationResult(request); 
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const id: number = parseInt(request.params.id,10)
        try {
            const author = request.body;
    
        } catch (error) {
            return response.status(500).json({ message: "Internal server error" });
        }
    }
);
// DELETE: Delete an  author based on  the id 
authorRouter.delete("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10); 
    try {
        await AuthorService.deleteAuthor(id);
        response.json("Author has been successfully deleted");
    } catch (error: any) {
        response.status(500).json({ message: "Internal server error" });
    }
});
