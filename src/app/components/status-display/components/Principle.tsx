import Tooltip from "../../tooltip/Tooltip";

export default function Principle() {
  return (
    <Tooltip content="a reason for being">
      Ikigai (
      <span
        lang="ja"
        style={{
          fontFamily: "'nbintl', 'Hiragino Sans'",
          letterSpacing: "0.1em",
        }}
      >
        生き甲斐
      </span>
      )
    </Tooltip>
  );
}
