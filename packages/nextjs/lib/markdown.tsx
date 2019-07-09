import MarkdownToJsx from 'markdown-to-jsx';

const H1 = ({ children }) => (
  <h1>
    {children}
    <style jsx>{`
      h1 {
        margin-bottom: 15px;
      }
    `}</style>
  </h1>
);

const H2 = ({ children }) => (
  <h2>
    {children}
    <style jsx>{`
      h2 {
        margin-bottom: 15px;
      }
    `}</style>
  </h2>
);

const H3 = ({ children }) => (
  <h3>
    {children}
    <style jsx>{`
      h3 {
        margin-bottom: 15px;
      }
    `}</style>
  </h3>
);

const H4 = ({ children }) => (
  <h4>
    {children}
    <style jsx>{`
      h4 {
        margin-bottom: 15px;
      }
    `}</style>
  </h4>
);

const H5 = ({ children }) => (
  <h5>
    {children}
    <style jsx>{`
      h5 {
        margin-bottom: 15px;
      }
    `}</style>
  </h5>
);

const P = ({ children }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        margin-bottom: 15px;
      }
    `}</style>
  </p>
);

const Markdown = ({
  data,
}) => (
  <MarkdownToJsx
    options={{
      overrides: {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        p: P,
      },
    }}
  >
    {data}
  </MarkdownToJsx>
);

export default Markdown;
