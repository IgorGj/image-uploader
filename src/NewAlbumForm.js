import React, { useState } from "react";
import { app } from "./base";

const db = app.firestore();

export const NewAlbumForm = () => {
  const [albumName, setAlbumName] = useState("");
  const [km, setKm] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");

  const onAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };
  const onAlbumKmChange = (e) => {
    setKm(e.target.value);
  };

  const onAlbumYearChange = (e) => {
    setAge(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onAlbumCreate = () => {
    if (!albumName) {
      return;
    }
    db.collection("albums")
      .doc(albumName)
      .set({ name: albumName, distance: km, year: age, desc: description });
    setAlbumName("");
    setKm("");
    setAge("");
    setDescription("");
  };

  return (
    <>
      <input
        placeholder="Album Name"
        value={albumName}
        onChange={onAlbumNameChange}
        type="text"
      />
      <input
        value={age}
        type="text"
        id="age"
        placeholder="Year"
        onChange={onAlbumYearChange}
      />
      <input
        value={km}
        onChange={onAlbumKmChange}
        type="text"
        placeholder="Place"
      />
      <input
        value={description}
        type="text"
        id="description"
        placeholder="Description"
        onChange={onDescriptionChange}
      />
      <button onClick={onAlbumCreate}>Create Album</button>
    </>
  );
};
