import ReadingLog from "src/models/ReadingLog";

export default class Book {

  constructor(title = "",
              subtitle = "",
              authors = [],
              publisher = "",
              publishedDate,
              description = "",
              isbn = "",
              pageCount = 0,
              categories = [],
              thumbnail = "",) {
    this.type = "Book";

    this.title = title;
    this.subtitle = subtitle;
    this.authors = authors;
    this.publisher = publisher;
    this.publishedDate = publishedDate ?? new Date().toISOString().split("T")[0].replaceAll('-', '/');
    this.description = description;
    this.isbn = isbn;
    this.pageCount = pageCount;
    this.categories = categories;
    this.thumbnail = thumbnail;

    this.readingLog = new ReadingLog();
  }
}
