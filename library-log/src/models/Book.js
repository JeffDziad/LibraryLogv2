import ReadingLog from "src/models/ReadingLog";

// export default class Book {
//
//   constructor(title = "",
//               subtitle = "",
//               authors = [],
//               publisher = "",
//               publishedDate,
//               description = "",
//               isbn = "",
//               pageCount = 0,
//               categories = [],
//               thumbnail = "",) {
//     this.type = "Book";
//
//     this.title = title;
//     this.subtitle = subtitle;
//     this.authors = authors;
//     this.publisher = publisher;
//     this.publishedDate = publishedDate ?? new Date().toISOString().split("T")[0].replaceAll('-', '/');
//     this.description = description;
//     this.isbn = isbn;
//     this.pageCount = pageCount;
//     this.categories = categories;
//     this.thumbnail = thumbnail;
//
//     this.readingLog = new ReadingLog();
//   }
// }

export default function Book(obj=null, id="") {
  let b = {
    docId: id,
    type: "Book",
    title: "",
    subtitle: "",
    authors: [],
    publisher: "",
    publishedDate: new Date().toISOString().split("T")[0].replaceAll('-', '/'),
    description: "",
    isbn: "",
    pageCount: 0,
    categories: [],
    thumbnail: "",
    readingLog: new ReadingLog(),
  }

  if(obj) {
    b.title = obj.title ? obj.title : "";
    b.subtitle = obj.subtitle ? obj.subtitle : "";
    b.authors = obj.authors ? obj.authors : [];
    b.publisher = obj.publisher ? obj.publisher : "";
    b.publishedDate = obj.publishedDate ? obj.publishedDate : new Date().toISOString().split("T")[0].replaceAll('-', '/');
    b.description = obj.description ? obj.description : "";
    b.isbn = obj.isbn ? obj.isbn : "";
    b.pageCount = obj.pageCount ? obj.pageCount : 0;
    b.categories = obj.categories ? obj.categories : [];
    b.thumbnail = obj.thumbnail ? obj.thumbnail : "";
    b.readingLog = obj.readingLog ? obj.readingLog : new ReadingLog();
  }

  return b;
}
