import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfigJson";

const app = initializeApp(firebaseConfig);

export default app