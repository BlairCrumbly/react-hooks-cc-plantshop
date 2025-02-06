import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";




const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching plants...');
    setIsLoading(true);
    fetch('http://localhost:6001/plants')
      .then(r => {
        if (!r.ok) {
          throw new Error('Failed to fetch plants');
        }
        return r.json();
      })
      .then(plantsData => {
        setPlants(plantsData);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      console.log('PlantPage cleanup');
    };
  }, []);

  useEffect(() => {
    console.log('Search term updated:', searchTerm);
  }, [searchTerm]);

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleMarkSoldOut = (id) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
    ));
  };

  const filteredPlants = plants
    .filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      
      <main>
        
        <NewPlantForm onAddPlant={handleAddPlant} />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PlantList 
          plants={filteredPlants}
          onMarkSoldOut={handleMarkSoldOut}
        />

      </main>
    </div>
  );
};

export default PlantPage;