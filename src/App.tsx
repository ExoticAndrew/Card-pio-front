import { useState } from "react";
import { useFoodData } from './hooks/useFoodData';
import { Card } from './components/cards/card';
import { CreateModal } from './components/card/Modal/CreateModal';
import type { FoodData } from './interface/FoodData';
import './App.css';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <>
      <div className="container">
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data?.map((foodData: FoodData) => (
            <Card
              key={foodData.id}
              price={foodData.price}
              title={foodData.title}
              image={foodData.image}
            />
          ))}
        </div>

        <button onClick={handleToggleModal} className="btn-primary">
          Novo
        </button>
      </div>

      
      {isModalOpen && <CreateModal closeModal={handleToggleModal} />}
    </>
  );
}

export default App;
