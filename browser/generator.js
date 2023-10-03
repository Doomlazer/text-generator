import { generate } from "../generator/index.js";

self.onmessage = ({ data: settings }) => {
  const resultTemp = generate(settings);
  const result = resultTemp.slice(resultTemp .indexOf('\x0A')+1);
  self.postMessage({ result });
};
