import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollView, Wrapper } from "../../styles/pages.style";
import readme from "./README.md";
import rehypeRaw from "rehype-raw";
import Legal from "../../components/legal";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Docs = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(readme)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div>
      <ScrollView>
        <Wrapper style={{ marginBottom: "20px" }}>
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        </Wrapper>
        <Legal>
          <>
            Copyright © 2023 Carla Pont |{" "}
            <PrivacyLink to="/privacy">Privacy Policy</PrivacyLink> |{" "}
            <PrivacyLink to="/terms">Terms of Use</PrivacyLink>
          </>
        </Legal>
      </ScrollView>
    </div>
  );
};

export const PrivacyLink = styled(Link)`
  color: white;
`;

export default Docs;
