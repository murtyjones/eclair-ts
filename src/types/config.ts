export interface Options {
  // e.g. '127.0.0.1:8080'
  url: string;
  headers: {
    // E.g. 'Basic OmVjbGFpcnB3'
    Authorization: string;
  };
}
