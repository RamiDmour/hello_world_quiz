export interface Language {
  name: string;
  code: string;
  key: string;
}

export interface Quote {
  textPart: string;
  authorName: string;
  bookName?: string;
}

export interface Country {
  name: string; // PRIMARY
  captial: string;
}

const quotes: Quote[] = [
  {
    textPart: 'Quote1',
    authorName: 'Ibrahim',
    bookName: 'Suck so,e dick',
  },
  {
    textPart: 'Quote1',
    authorName: 'Ibrahim',
    bookName: 'Suck so,e dick',
  },
  {
    textPart: 'Quote1',
    authorName: 'Ibrahim',
  },
  {
    textPart: 'Quote1',
    authorName: 'Ibrahim',
  },
];

interface Round {
  answers: Quote[]
  question: Quote;
  number: number;
}

function getRounds(quotes: Quote[]) {
  return quotes;
};

getRounds(quotes.filter(quote => !quote.bookName))
