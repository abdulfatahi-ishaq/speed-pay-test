import React from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [clicked, setClicked] = React.useState(true);
  const [selected, setSelected] = React.useState("");
  const [trendingData, setTrendingData] = React.useState();
  const [filterData, setFilterData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleSelectTrending = () => {
    setClicked(false);
    setLoading(true);
    setSelected("trending");
    Axios.get(
      "https://api.giphy.com/v1/gifs/trending?api_key=BBllUXSslRRw4234LL4rT5VfMbKLLG6A"
    ).then((res) => {
      setTrendingData(res.data.data);
      setLoading(false);
      // console.log(res.data.data, trendingData);
    });
  };

  const handleSelectSearch = () => {
    setClicked(false);
    setSelected("search");
    Axios.get(
      "https://api.giphy.com/v1/gifs/trending?api_key=BBllUXSslRRw4234LL4rT5VfMbKLLG6A"
    ).then((res) => {
      setFilterData(res.data.data);
      // console.log(res.data.data, trendingData);
    });
    // console.log(selected, clicked);
  };

  const handleFilterSearch = (e) => {
    const { value } = e.target;
    const newFilterData = [...filterData].filter((obj) =>
      Object.keys(obj).some((key) =>
        String(obj[key]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterData(newFilterData);
  };

  // React.useEffect(() => {
  //   setData(trendingData);
  // }, []);

  // console.log(trendingData);
  return (
    <div className="container d-flex align-items-center justify-content-center flex-column mt-4">
      <h3>Giphy API Integration</h3>
      <div className="d-flex mb-3">
        <button className="borderless" onClick={handleSelectTrending}>
          Trending
        </button>
        <span className="mx-4">|</span>
        <button className="borderless" onClick={handleSelectSearch}>
          Search
        </button>
      </div>
      {clicked ? (
        <>
          <p>Click any of the links above</p>
        </>
      ) : selected === "trending" ? (
        <div className="text-center w-100">
          <p className="mt-1">Trending List of Giphy:</p>
          {loading === true ? (
            <div class="spinner-border" role="status" />
          ) : (
            <div className="row my-3">
              {trendingData &&
                trendingData.map((item) => {
                  return (
                    <div className="col-md-3">
                      <div class="card mx-2 my-3">
                        <img
                          height="100px"
                          class="card-img-top"
                          src={item.images.downsized.url}
                          alt="gif"
                        />
                        <div class="card-body">
                          <p style={{ textAlign: "left" }} class="text-left">
                            By: <b>{item.username}</b>
                          </p>
                          <p
                            style={{ textAlign: "left", fontSize: "15px" }}
                            class="text-left"
                          >
                            Date of Trend: <b>{item.trending_datetime}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="d-flex flex-column text-center justify-content-center align-items-center">
            <p className="my-3">Search List of Giphy:</p>
            <input
              style={{ maxWidth: "300px", textAlign: "center" }}
              placeholder="Enter Search"
              onChange={(e) => handleFilterSearch(e)}
            />{" "}
            &nbsp;&nbsp;
          </div>
          {filterData &&   <div className="row">
            {filterData.length === 0 ? (
              <p style={{ textAlign: "center" }}>No Result Found</p>
            ) : (
              filterData &&
              filterData.map((item) => {
                return (
                  <div className="col-md-3">
                    <div
                      style={{ minWidth: "25vw", maxHeight: "200px" }}
                      class="card mx-2 my-3"
                    >
                      <img
                        height="100px"
                        class="card-img-top"
                        src={item.images.downsized.url}
                        alt="gif"
                      />
                      <div class="card-body">
                        <p style={{ textAlign: "left" }} class="text-left">
                          By: <b>{item.username}</b>
                        </p>
                        <p
                          style={{ textAlign: "left", fontSize: "15px" }}
                          class="text-left"
                        >
                          Date of Trend: <b>{item.trending_datetime}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>}
        </div>
      )}
      {/* {selected === "trending" ? <div>Trending List of Giphy</div> : <div>Search List of Giphy:</div>} */}
    </div>
  );
}

export default App;
