import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function Interactions() {
  const [interactions, setInteractions] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch(`${API}/interactions/`)
      .then(res => res.json())
      .then(data => setInteractions(data));
  }, []);

  const addInteraction = () => {
    fetch(`${API}/interactions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctor_id: Number(doctorId),
        notes: notes
      })
    })
      .then(res => res.json())
      .then(() => {
        setDoctorId("");
        setNotes("");
        window.location.reload();
      });
  };

  return (
    <div>
      <h2>Interactions</h2>

      <input
        placeholder="Doctor ID"
        value={doctorId}
        onChange={e => setDoctorId(e.target.value)}
      />
      <textarea
        placeholder="Interaction notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <br />
      <button onClick={addInteraction}>Add Interaction</button>

      <ul>
        {interactions.map(i => (
          <li key={i.id}>
            <b>Doctor ID:</b> {i.doctor_id}
            <br />
            <b>Notes:</b> {i.notes}
            <br />
            <b>AI Summary:</b> {i.ai_summary || "—"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Interactions;
