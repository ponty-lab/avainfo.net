import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Page, ScrollView, View } from "../../styles/pages.style";
import readme from "./README.md";
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
      <ScrollView>
        <View>
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className="markdown"
          />
        </View>
      </ScrollView>
    </Page>
  );
};

export default Docs;
