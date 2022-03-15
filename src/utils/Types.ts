export interface TypeGenres {
  _id: string;
  name: string;
}

export interface TypeImage {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
}

export interface TypeArtists {
  _id: string;
  paintings: TypePaintings[];
  genres: TypeGenres[];
  name: string;
  description:string;
  yearsOfLife?: string;
  avatar: TypeImage;
  mainPainting: TypePaintings;
}

export interface TypePaintings {
  _id: string;
  name: string;
  yearOfCreation?: string;
  image: TypeImage;
  artist: string;
}