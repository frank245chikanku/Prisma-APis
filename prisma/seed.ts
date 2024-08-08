import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
  authorFullName: string; 
};

async function seed() {
  try {
    console.log("Seeding authors...");
    const authors = getAuthors();
    
    await db.author.deleteMany({});
    await db.book.deleteMany({});

    const createdAuthors = await Promise.all(
      authors.map(async (author) => {
        const result = await db.author.create({
          data: {
            firstName: author.firstName,
            lastName: author.lastName
          }
        });
        console.log("Author created:", result);
        return result; 
      })
    );

    const authorMap = new Map<string, number>(
      createdAuthors.map(author => [`${author.firstName} ${author.lastName}`, author.id])
    );

    console.log("Seeding books...");
    await Promise.all(
      getBooks().map(async (book) => {
        const authorId = authorMap.get(book.authorFullName);
        if (!authorId) {
          console.error(`Author '${book.authorFullName}' not found. Please ensure the author is seeded correctly.`);
          return;
        }

        try {
          const result = await db.book.create({
            data: {
              title: book.title,
              isFiction: book.isFiction,
              datePublished: book.datePublished,
              authorId: authorId,
            },
          });
          console.log("Book created:", result);
        } catch (error) {
          console.error("Error creating book:", book.title, error);
        }
      })
    );
  } catch (error) {
    console.error("Error in seeding process:", error);
  }
}

seed();

function getAuthors(): Array<Author> {
  return [
    { firstName: "John", lastName: "Doe" },
    { firstName: "William", lastName: "Shakespeare" },
    { firstName: "Yuval Noah", lastName: "Harari" }
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Sapiens",
      isFiction: false,
      datePublished: new Date(),
      authorFullName: "Yuval Noah Harari"
    },
    {
      title: "Homo Deus",
      isFiction: false,
      datePublished: new Date(),
      authorFullName: "John Doe" 
    },
    {
      title: "The Ugly Duckling",
      isFiction: true,
      datePublished: new Date(),
      authorFullName: "William Shakespeare" 
    }
  ];
}
