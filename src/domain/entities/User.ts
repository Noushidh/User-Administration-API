export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
  ) {
    if(!name.trim()){
      throw new Error("user name cannot be empty")
    }
    if(!email.includes("@")){
      throw new Error("Invalid email")
    }
  }
}
