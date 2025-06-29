import Noticia from "./Noticia";

const ListaNoticias = ({ noticiaProps }) => {
  return (
    <div>
      <div className="text-center bg-white rounded-3 p-3">
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {noticiaProps.map((item, indice) => (
            <div className="col" key={indice}>
              <Noticia noticiaProps={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaNoticias;
