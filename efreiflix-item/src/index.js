import React from "react";
import { createRoot } from "react-dom/client";
import ItemCard from "./ItemCard";

const mount = () => {
  const container = document.getElementById("root");
  if (!container) {
    console.error("Container #root not found");
    return;
  }
  const root = createRoot(container);
  root.render(
    <ItemCard
      imageSrc="https://picsum.photos/300/450"
      alt="Demo"
      onClick={() => console.log("clicked")}
    />,
  );
};

export { mount };
