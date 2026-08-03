export interface IHashService {
  hash(password: string): Promise<string>;
}