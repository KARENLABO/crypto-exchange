import { Spin } from "antd";
import "./styles.scss";

function Loader() {
  return (
    <div className="loading-overlay">
      <Spin size="large" />
      <p>Loading necessary information</p>
    </div>
  );
}

export default Loader;
