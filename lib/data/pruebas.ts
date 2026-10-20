
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const pruebasRef = collection(db, "pruebas_temporales");

export async function guardarTexto(texto: string): Promise<void> {
  if (!texto.trim()) return;

  await addDoc(pruebasRef, {
    texto: texto.trim(),
  });
}

export async function cargarDatos(): Promise<string[]> {
  const snapshot = await getDocs(pruebasRef);

  return snapshot.docs.map((documento) => {
    return documento.data().texto as string;
  });
}
