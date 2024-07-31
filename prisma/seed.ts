import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

async function seed() {
  try {
    console.log("Seeding authors...");
    const authors = getAuthors();
    
    await db.author.deleteMany({});
    
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

    console.log("Fetching author 'Yuval Noah'...");
    const yuvalNoahId = authorMap.get("Yuval Noah Harari");

    if (!yuvalNoahId) {
      console.error("Author 'Yuval Noah Harari' not found. Please ensure the author is seeded correctly.");
      return;
    }

    console.log("Seeding books...");
    await Promise.all(
      getBooks().map(async (book) => {
        try {
          const result = await db.book.create({
            data: {
              title: book.title,
              isFiction: book.isFiction,
              datePublished: book.datePublished,
              authorId: yuvalNoahId
            }
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
    },
    {
      title: "Homo Deus",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "The Ugly Duckling",
      isFiction: true,
      datePublished: new Date(),
    }
  ];
}
