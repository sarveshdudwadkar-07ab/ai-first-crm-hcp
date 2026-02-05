import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");

  const [doctorId, setDoctorId] = useState("");
  const [notes, setNotes] = useState("");
  const [interactions, setInteractions] = useState([]);

  // load doctors
  const loadDoctors = async () => {
    const res = await fetch(`${API}/doctors/`);
    const data = await res.json();
    setDoctors(data);
  };

  // load interactions
  const loadInteractions = async () => {
    const res = await fetch(`${API}/interactions/`);
    const data = await res.json();
    setInteractions(data);
  };

  useEffect(() => {
    loadDoctors();
    loadInteractions();
  }, []);

  // ADD DOCTOR
  const submitDoctor = async () => {
    try {
      const res = await fetch(`${API}/doctors/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, specialty }),
      });

      if (!res.ok) throw new Error("Doctor API failed");

      setName("");
      setSpecialty("");
      loadDoctors();
    } catch (err) {
      alert("Error adding doctor");
      console.error(err);
    }
  };

  // ADD INTERACTION
  const submitInteraction = async () => {
    try {
      const res = await fetch(`${API}/interactions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor_id: Number(doctorId),
          notes,
        }),
      });

      if (!res.ok) throw new Error("Interaction API failed");

      setDoctorId("");
      setNotes("");
      loadInteractions();
    } catch (err) {
      alert("Error adding interaction");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI-First CRM (HCP)</h1>

      <h2>Add Doctor</h2>
      <input
        placeholder="Doctor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Specialty"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      />
      <button onClick={submitDoctor}>Add Doctor</button>

      <h2>Doctors</h2>
      <ul>
        {doctors.map((d) => (
          <li key={d.id}>
            {d.id} — {d.name} ({d.specialty})
          </li>
        ))}
      </ul>

      <hr />

      <h2>Add Interaction</h2>
      <input
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <textarea
        placeholder="Interaction Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={submitInteraction}>Add Interaction</button>

      <h2>Interactions</h2>
      <ul>
        {interactions.map((i) => (
          <li key={i.id}>
            Doctor {i.doctor_id}: {i.ai_summary || i.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
