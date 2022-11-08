/* eslint-disable react/prop-types */

import React from "react";

import Text from "./text";
import Code from "./code";
const Block = ({ block }) => {
  const { type } = block;
  const value = block[type];
  console.log(value, type === "image", "Block_Ilias");
  if (type === "paragraph") {
    return (
      <p className="mb-4">
        <Text text={value.rich_text} />
      </p>
    );
  }
  if (type === "quote") {
    return (
      <blockquote>
        {value.rich_text.map(({ text }, index) => (
          <p key={index}>{text.content}</p>
        ))}
      </blockquote>
    );
  }
  if (type === "heading_1") {
    return <Text text={value.rich_text} />;
  }
  if (type === "heading_2") {
    return <Text text={value.rich_text} />;
  }
  if (type === "heading_3") {
    return (
      <h3 className="text-lg font-bold md:text-xl mb-4">
        <Text text={value.rich_text} />
      </h3>
    );
  }
  if (type === "text") {
    return <p className="px-4 py-2 mb-4">{value.rich_tex}</p>;
  }
  if (type === "bulleted_list_item" || type === "numbered_list_item") {
    return (
      <li className="mb-4">
        <Text text={value.rich_text} />
      </li>
    );
  }
  if (type === "code") {
    return (
      <Code
        language={value.language || ""}
        code={value.rich_text.map((el) => el.text.content).join("\n")}
      />
    );
  }
  console.log(value, type);

  if (type === "image") {
    if (value.file)
      return <img className="notion-inline-image" src={value.file.url} />;
    else return null;
  }

  return (
    <p className="bg-red-600 px-4 py-2 mb-4">
      Not supported yet by Notion API {type} {JSON.stringify(value)}
    </p>
  );
};

export default Block;
