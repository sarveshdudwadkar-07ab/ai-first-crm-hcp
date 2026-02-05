import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    fetch(`${API}/doctors/`)
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const addDoctor = () => {
    fetch(`${API}/doctors/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        specialty: specialty
      })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setSpecialty("");
        window.location.reload();
      });
  };

  return (
    <div>
      <h2>Doctors</h2>

      <input
        placeholder="Doctor name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Specialty"
        value={specialty}
        onChange={e => setSpecialty(e.target.value)}
      />
      <button onClick={addDoctor}>Add Doctor</button>

      <ul>
        {doctors.map(doc => (
          <li key={doc.id}>
            {doc.name} — {doc.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Doctors;
