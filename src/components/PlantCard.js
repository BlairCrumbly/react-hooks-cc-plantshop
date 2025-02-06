import { useEffect } from "react";

const PlantCard = ({ plant, onMarkSoldOut }) => {
  useEffect(() => {
    console.log(`Plant ${plant.name} card mounted`);
    return () => {
      console.log(`Plant ${plant.name} card unmounted`);
    };
  }, [plant.name]);




  const handleSoldOut = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inStock: !plant.inStock }),
    })
      .then(r => r.json())
      .then(() => onMarkSoldOut(plant.id));
  };

  return (
    
      
      <li className="card">
      <img src={plant.image} alt={plant.name} />
        <h4>{plant.name}</h4>
        <p>${plant.price}</p>
      
        <button className={plant.inStock ? 'primary' : ''} onClick={handleSoldOut}>
          {plant.inStock ? 'In Stock' : 'Sold Out'}
        </button>
      
    </li>
    
      
  );
};

export default PlantCard;