import "../STyle.css";
function SelectModePriceOffer(props) {
  const handleSelectModeNormal = () => {
    props?.setSelectModeNormal(true);

    props?.setCustomSelectMode(false);
  };
  const handleSelectModeCustom = () => {
    props?.setCustomSelectMode(true);
    props?.setSelectModeNormal(false);
  };
  return (
    <div className="Project">
      <div className="container seletMode d-flex justify-content-center align-items-center  p-5 f-wrap gap-3">
        <div className="SelectModePrice">
          <div className="container">
            <div
              className={`boxSelect quality ${props?.selectModeNormal ? "selectBox" : ""}`}
            >
              <div className="img-holder">
                <img src="/image/discount2.png" alt="Custom mode" />
              </div>
              <h2>Normal mode </h2>
              <p>select normal price offer</p>
              <button onClick={handleSelectModeNormal}>Normal</button>
            </div>
            <div
              className={`boxSelect time ${
                props?.customSelectMode ? "selectBox" : ""}`}
            >
              <div className="img-holder">
                <img src="/image/features-03.jpg" alt="Custom mode" />
              </div>
              <h2>Custom mode</h2>
              <p>Custom mode Offer price</p>
              <button onClick={handleSelectModeCustom}>Custom</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectModePriceOffer;
