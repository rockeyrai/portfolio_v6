import Dexie, { Table } from "dexie";

export interface User {
  id?: number;
  name: string;
  email: string;
}


// Extend Dexie
export class AppDB extends Dexie {
  users!: Table<User, number>;

  constructor() {
    super("AppDB");
    this.version(1).stores({
      users: "++id,name,email",
    });
  }
}

// Create the instance
export const db = new AppDB();
