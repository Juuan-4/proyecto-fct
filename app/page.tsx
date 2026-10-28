
"use client";

import { useEffect, useState } from "react";
import {
  guardarTexto as guardarTextoEnFirebase,
  cargarDatos,
} from "@/lib/data/pruebas";

export default function Home() {
  const [texto, setTexto] = useState("");
  const [datos, setDatos] = useState<string[]>([]);
  const [error, setError] = useState("");

  async function actualizarDatos() {
    try {
      setError("");
      const nuevosDatos = await cargarDatos();
      setDatos(nuevosDatos);
    } catch {
      setError("No se pudieron cargar los datos.");
    }
  }

  async function guardar() {
    if (!texto.trim()) return;

    try {
      setError("");
      await guardarTextoEnFirebase(texto);
      setTexto("");
      await actualizarDatos();
    } catch {
      setError("No se pudo guardar el texto.");
    }
  }

      useEffect(() => {
    async function cargarDatosIniciales() {
      try {
        const nuevosDatos = await cargarDatos();
        setDatos(nuevosDatos);
      } catch {
        setError("No se pudieron cargar los datos.");
      }
    }

    void cargarDatosIniciales();
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

      <button type="button" onClick={guardar}>
        Guardar
      </button>

      {error && <p role="alert">{error}</p>}

      <h2>Datos guardados</h2>

      {datos.map((dato, index) => (
        <p key={index}>{dato}</p>
      ))}
    </main>
  );
}
