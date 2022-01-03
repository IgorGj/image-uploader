import React from "react";
import { NewAlbumForm } from "./NewAlbumForm";
import { Link } from "react-router-dom";
import noImage from "./noImage.jpg";

export const Home = ({ albums }) => {
  return (
    <>
      <section style={{ textAlign: "center" }}>
        {albums.map((album) => (
          <Link to={`/${album.id}`}>
            <aside>
              <img
                style={{ maxWidth: "100%", height: "300px" }}
                src={album.images ? album?.images[0]?.url : noImage}
                alt=""
              />
              <h3>{album.name}</h3>
            </aside>
          </Link>
        ))}
      </section>
      <footer>
        <NewAlbumForm></NewAlbumForm>
      </footer>
    </>
  );
};
