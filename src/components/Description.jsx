import React from "react";
import Linkify from "react-linkify";
import { truncateString } from "../utils";

const Description = ({ text }) => {
  // Split text by line breaks
  const textWithLineBreaks = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a
            href={decoratedHref}
            key={key}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {truncateString(decoratedText, 30)}
          </a>
        )}
      >
        {line}
      </Linkify>
      <br />
    </React.Fragment>
  ));

  return <div>{textWithLineBreaks}</div>;
};

export default Description;
