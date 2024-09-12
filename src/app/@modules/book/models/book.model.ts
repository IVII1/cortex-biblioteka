export class Book {
  id!: number;
  title!: string;
  photo!: string;
  pictures!: string[];
  samples!: number;
  bSamples!: number;
  rSamples!: number;
  fSamples!: number;
  ableToBorrow!: boolean;
  ableToReserve!: boolean;
  authors!: { id: number; name: string; surname: string }[];
  categories!: { id: number; name: string }[];
  genres!: { id: number; name: string }[];
  publishers!: { id: number; name: string }[];
  script!: { id: number; name: string };
  language!: { id: number; name: string };
  bookbind!: { id: number; name: string };
  format!: { id: number; name: string };
  description!: string;
  rating!: string;
  pages!: number;
  pDate!: string;
  isbn!: string;
}
