"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import FormField from "./FormField";

export function ModalFormulario() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="snap-center">
        <div className="w-40">
        </div>
        <Button className= "bg-[#fca5a5] text-black" onClick={() => setOpenModal(true)}>Realizar Publicación</Button>
      </div>

      <Modal
        show={openModal}

        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="bg-[#F5E1DC] text-white flex justify-center">¿A quien debo buscar?</Modal.Header>
        <Modal.Body className="bg-[#F5E1DC]">
          <div className="space-y-4 p-2">
            <FormField
              label="Nombre"
              id="nombre"
              type="text"
              placeholder="Escribe el nombre del animal"
            />
            <FormField
              label="Tipo de animal"
              id="tipo-animal"
              type="text"
              placeholder="Ej: Perro, Gato..."
            />
            <FormField
              label="Género"
              id="genero"
              type="radio"
              options={[
                { label: "Macho", value: "macho" },
                { label: "Hembra", value: "hembra" },
              ]}
            />
            <FormField
              label="Características"
              id="caracteristicas"
              type="textarea"
              placeholder="Describe las características del animal"
            />
            <FormField
              label="Tamaño"
              id="tamano"
              type="text"
              placeholder="Ej: Pequeño, Mediano, Grande"
            />
            <FormField
              label="Edad"
              id="edad"
              type="number"
              placeholder="Edad del animal"
            />
            <FormField
              label="Recompensa"
              id="recompensa"
              type="number"
              placeholder="Si hay recompensa, ingrésala"
            />
            <FormField
              label="Contacto"
              id="contacto"
              type="text"
              placeholder="Número de teléfono o email"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-8 bg-[#F5E1DC]">
          <Button onClick={() => setOpenModal(false)} className="bg-[#14AE5C] text-black">Publicar</Button>
          <Button color="gray" onClick={() => setOpenModal(false)} className="bg-[#FF859B] text-black">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalFormulario;
