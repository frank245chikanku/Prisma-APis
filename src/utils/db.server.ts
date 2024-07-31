import  { PrismaClient } from  "@prisma/client"; 

let db: PrismaClient; 
var _bd: PrismaClient | undefined; 


if (!global._db) {
    global._db = new PrismaClient(); 
}

    db = global._db; 

    export {db};
