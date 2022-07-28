import React, { useEffect, useState } from "react";

export default function InfiniteLoading({ length }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      let len = (text.length + 1) % length;
      let newText = "";
      for (let i = 0; i < len; i++) newText += " .";
      setText(newText);
    }, 500);
    return () => clearInterval(timer);
  });

  return <div className="text-2xl font-bold my-2">Loading {text}</div>;
}
