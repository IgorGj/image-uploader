import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { NewPhoto } from "./NewPhoto";
import { app, storage } from "./base";
import noImage from "./noImage.jpg";
import { useHistory } from "react-router-dom";

const db = app.firestore();

export const Album = (doc) => {
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [age, setAge] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");

  const match = useRouteMatch("/:album");
  const { album } = match.params;
  const history = useHistory();

  useEffect(() => {
    const unmount = db
      .collection("albums")
      .doc(album)
      .onSnapshot((doc) => {
        setImages(doc.data().images || []);
        setAlbumName(doc.data().name);
        setAge(doc.data().year);
        setDistance(doc.data().distance);
        setDescription(doc.data().desc);
      });
    return unmount;
  }, []);

  const deleteDoc = () => {
    db.collection("albums")
      .doc(albumName)
      .delete()
      .then(() => {
        console.log("album successfully deleted");
      })
      .catch((error) => {
        console.log("error removing doc");
      });
    history.push({ pathname: "/" });
  };
  const deleteImage = (imgUrl, imgName) => {
    storage
      .refFromURL(imgUrl)
      .delete()
      .then((e) => {
        console.log("album successfully ", e);
      })
      .catch((error) => {
        console.log("error removing doc", error);
      });
    db.collection("albums")
      .doc(album)
      .update({
        images: images.filter((image) => image.name !== imgName),
      })
      .then((e) => console.log(e))
      .catch((error) => {
        console.log("error removing doc", error);
      });
  };

  return (
    <>
      <section>
        <header>
          <h1>{albumName}</h1>
          <p>
            Go to the <Link to="/">Home Page</Link>
          </p>
        </header>
        {images.map((image) => (
          <aside key={image.name}>
            <img
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
              }}
              onClick={() => deleteImage(image.url, image.name)}
              src={image.url}
              alt=""
            />
          </aside>
        ))}
      </section>
      <footer>
        <NewPhoto currentAlbum={album}></NewPhoto>
        <button onClick={deleteDoc}>Delete Album</button>
      </footer>
      <div style={{ textAlign: "center" }}>
        <p>Year: {age}</p>
        <p>Place: {distance}</p>
        <p>Description: {description}</p>
      </div>
    </>
  );
};
