import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  projectId: "demo-no-project",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

if (typeof window !== "undefined") {
  const emulator = process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST;

  if (emulator) {
    const [host, port] = emulator.split(":");
    connectFirestoreEmulator(db, host, Number(port));
  }
}
