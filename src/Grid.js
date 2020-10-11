import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Grid = () => {
  const initalLayout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];

  let [layout, setLayout] = useState(initalLayout);
  let [key, setKey] = useState("d");
  useEffect(() => {
    console.log("Layout:", layout);
  }, [layout]);

  const layoutChange = (layout) => {
    console.log(layout);
  };

  const incrementChar = (c) => {
    setKey(String.fromCharCode(c.charCodeAt(0) + 1));
  };

  const dropHandler = (layout, layoutItem) => {
    console.log("Drop Handler called");

    let item = layoutItem;
    item.i = key;
    console.log(JSON.stringify(layoutItem, ["x", "y", "w", "h"], 2));
    setLayout((initial) => [...initial, item]);
    incrementChar(key);
  };

  return (
    <div>
      <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div>
      <GridLayout
        className="layout"
        layout={layout}
        onLayoutChange={layoutChange}
        onDrop={dropHandler}
        isDroppable={true}
        cols={12}
        rowHeight={40}
        width={800}
      >
        {layout.map((item) => (
          <div key={item.i}>{item.i}</div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Grid;
