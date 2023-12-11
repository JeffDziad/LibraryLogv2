export default class GoogleBooksApi {
  static API_KEY = "AIzaSyCmTMIJ06qQ_q38lrLv1AhK7eOtiRIzIxY";
  static BASE = "https://www.googleapis.com/books/v1/volumes";
  static KEYWORDS = {
    "Title": "intitle",
    "Author": "inauthor",
    "Publisher": "inpublisher",
    "Description": "subject",
    "(ISBN) International Standard Book Number": "isbn",
    "(LCCN) Library of Congress Control Number": "lccn",
    "(OCLC) Online Computer Library Center": "oclc",
  };

  async getBooks(keyword, query) {
    let url = this.constructURL(keyword, query);
    const res = await fetch(url);
    return await res.json();
  }

  constructURL(keyword, query) {
    return `${GoogleBooksApi.BASE}?q=${keyword}:${query}&key=${GoogleBooksApi.API_KEY}`;
  }
}
