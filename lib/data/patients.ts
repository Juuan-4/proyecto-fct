
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Patient } from "../../types/patient";

export async function getPatients(): Promise<Patient[]> {
  const snapshot = await getDocs(collection(db, "patients"));

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as Patient[];
}
