import { Button, Col, Form, Row } from "react-bootstrap";
import ListaNoticias from "./ListaNoticias";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Swal from "sweetalert2";

const Formulario = () => {
  const [categoria, setCategoria] = useState("");
  const [pais, setPais] = useState("");
  const [noticia, setNoticia] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);

  const obtenerNoticia = async () => {
    if (pais === "" || categoria === "") {
      Swal.fire({
        icon: "error",
        title: "Seleccione Pais y categoria",
        text: "Seleccione Pais y categoria, por último buscar",
      });
      return;
    }

    try {
      setMostrarSpinner(true);
      const respuesta = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_b337209814aa4936a8bbd412055a9faf&category=${categoria}&language=es&country=${pais}`
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
            Seleccione categoria y pais
          </Form.Label>
          <div className="d-md-flex align-items-center gap-2">
            <Form.Select
              className="my-3 text-center"
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

            <Form.Select
              className="text-center"
              required
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            >
              <option value="" disabled hidden>
                Pais
              </option>
              <option value="ar">Argentina</option>
              <option value="us">Estados Unidos</option>
              <option value="br">Brasil</option>
              <option value="mx">México</option>
              <option value="co">Colombia</option>
              <option value="es">España</option>
              <option value="fr">Francia</option>
              <option value="de">Alemania</option>
            </Form.Select>
            <div className="mt-3 mt-md-0 text-center">
              <Button
                onClick={obtenerNoticia}
                variant="primary"
                className="ms-md-2 fs-5 px-3"
              >
                Buscar
              </Button>
            </div>
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
