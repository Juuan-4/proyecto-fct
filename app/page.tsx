"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [texto, setTexto] = useState("");
  const [datos, setDatos] = useState<string[]>([]);

  async function guardarTexto() {
    if (!texto.trim()) return;

    await addDoc(collection(db, "pruebas_temporales"), {
      texto: texto,
    });

    setTexto("");
    await cargarDatos();
  }

  async function cargarDatos() {
    const snapshot = await getDocs(collection(db, "pruebas_temporales"));

    const nuevosDatos = snapshot.docs.map((doc) => doc.data().texto);

    setDatos(nuevosDatos);
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <main>
      <h1>Prueba Firestore</h1>

      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe algo"
      />

      <button type="button" onClick={guardarTexto}>
        Guardar
      </button>

      <h2>Datos guardados</h2>

      {datos.map((dato, index) => (
        <p key={index}>{dato}</p>
      ))}
    </main>
  );
}