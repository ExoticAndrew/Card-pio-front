import { useState, useEffect } from "react";
import { useFoodDataMutate } from '../../../hooks/useFoodDataMutate';
import type { FoodData } from '../../../interface/FoodData';

import "./modal.css";

interface InputProps {
  label: string;
  value: string | number;
  updateValue: (value: any) => void;
  type?: string;
  step?: string;
}

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue, type = "text", step }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        step={step}
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      />
    </>
  );
};

export function CreateModal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(""); // agora é string
  const [image, setImage] = useState("");

  const { mutate, isSuccess, isPending } = useFoodDataMutate();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const foodData: FoodData = {
      title,
      price: Number(price.replace(",", ".")), // converte para número aqui
      image,
    };

    mutate(foodData);
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setPrice("");
      setImage("");
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h1>Cadastre um novo item no cardápio</h1>
        <form className="input-container" onSubmit={submit}>
          <Input label="Título" value={title} updateValue={setTitle} />
          <Input
            label="Preço"
            value={price}
            type="number"
            step="0.01"
            updateValue={setPrice} // só atualiza string, sem converter
          />
          <Input label="Imagem" value={image} updateValue={setImage} />

          <button type="submit" className="btn-secondary">
            {isPending ? 'Postando...' : 'Postar'}
          </button>
        </form>
        <button onClick={closeModal} className="btn-cancel">Cancelar</button>
      </div>
    </div>
  );
}
