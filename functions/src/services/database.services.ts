import { getFirestore } from "firebase-admin/firestore";
import { DATABASES } from "~/constants/databases";

class DatabaseService {
  db: FirebaseFirestore.Firestore;
  constructor() {
    this.db = getFirestore();
  }
  get products() {
    return this.db.collection(DATABASES.PRODUCTS);
  }
}

const databaseService = new DatabaseService();
export default databaseService;
