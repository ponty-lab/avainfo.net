import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Page } from "../styles/pages.style";
import readme from "./README.md";
import style from "../styles/markdown-styles.module.css";
import rehypeRaw from "rehype-raw";

const Docs = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(readme)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <Page>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className={style.reactMarkDown}
      />
    </Page>
  );
};

export default Docs;
