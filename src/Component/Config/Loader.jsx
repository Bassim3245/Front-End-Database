import "./LoaderStyle.css";
function Loader() {
  return (
    <div className="bodyLodeing ">
      <div className="bg-dark">
        <div className="first">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="second">
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="third">
          <ul>
            <li></li>
            <li></li>
            <li className="floating-1"></li>
            <li className="floating-1"></li>
            <li className="floating-2"></li>
            <li className="floating-2"></li>
          </ul>
        </div>
        <div className="fourth">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li className="floating"></li>
            <li className="floating"></li>
            <li className="floating"></li>
            <li className="floating"></li>
          </ul>
          <span className="smile">
            <img
              src="/image/image copy.png"
              alt=""
              srcSet=""
              className="imgeLoader"
            />
          </span>
        </div>

        <div className="random-stars-container">
          <span className="random-stars"></span>
          <span className="random-stars"></span>
          <span className="random-stars"></span>
          <span className="random-stars"></span>
        </div>
      </div>
    </div>
  );
}
export default Loader;
