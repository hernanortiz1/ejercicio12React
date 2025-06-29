import { Button, Col, Form, Row } from "react-bootstrap";
import ListaNoticias from "./ListaNoticias";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Formulario = () => {
  const [categoria, setCategoria] = useState("");
  const [noticia, setNoticia] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);

  useEffect(() => {
    if (categoria !== "") {
      obtenerNoticia();
    }
  }, [categoria]);

  const obtenerNoticia = async () => {
    try {
      setMostrarSpinner(true);
      const respuesta = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_b337209814aa4936a8bbd412055a9faf&category=${categoria}&language=es`
      );

      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        console.log(datos.results);
        setNoticia(datos.results);
        setMostrarSpinner(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="p-3 border rounded-3 bg-white container">
        <Form.Group>
          <Form.Label className="fs-4 d-flex justify-content-center">
            Seleccione categoria
          </Form.Label>
          <div className="d-flex align-items-center ">
            <Form.Select
              required
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="" disabled hidden>
                Categorias
              </option>
              <option value="business">Negocios</option>
              <option value="entertainment">Entretenimiento</option>
              <option value="health">Salud</option>
              <option value="politics">Política</option>
              <option value="science">Ciencia</option>
              <option value="sports">Deportes</option>
              <option value="technology">Tecnología</option>
            </Form.Select>
          </div>
        </Form.Group>
      </section>
      <section className="mt-4">
        {mostrarSpinner ? (
          <div className="my-4 d-flex justify-content-center align-items-center">
            <ScaleLoader color="#0d6efd" loading={mostrarSpinner} size={50} />
          </div>
        ) : noticia.length === 0 ? (
          <p className="text-center fs-3">No hay noticias para mostrar.</p>
        ) : (
          <ListaNoticias noticiaProps={noticia} />
        )}
      </section>
    </div>
  );
};

export default Formulario;
