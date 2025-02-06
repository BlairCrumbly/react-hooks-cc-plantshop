import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";

const PlantList = ({ plants, onMarkSoldOut }) => {
  useEffect(() => {
    console.log('PlantList mounted or plants updated');
    return () => {
      console.log('PlantList unmounted');
    };
  }, [plants]);

  return (
    
    <ul className="cards">
      
      {plants.map(plant => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onMarkSoldOut={onMarkSoldOut}
        />
      ))}
    </ul>
  );
};

export default PlantList;
