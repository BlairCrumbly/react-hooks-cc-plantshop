import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {

  const [plantName, setPlantName] = useState("");
  const [PlantImage, setPlantImage] = useState("");
  const [PlantPrice, setPlantPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    const newPlant = {
      name: plantName,
      image: PlantImage,
      price: PlantPrice,
    };

    
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        
        onAddPlant(data);
      })
      .catch((error) => console.error("Error adding plant:", error));

    
    setPlantName("");
    setPlantImage("");
    setPlantPrice("");
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>

      
        
        <input
          type="text"
          placeholder="Plant Name"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
        />
      
      
        
        <input
          type="text"
          placeholder="Image URL"
          value={PlantImage}
          onChange={(e) => setPlantImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={PlantPrice}
          onChange={(e) => setPlantPrice(e.target.value)}
        />
      <button type="submit">Add Plant</button>
    </form>

    </div>
    
  );
}

export default NewPlantForm;
