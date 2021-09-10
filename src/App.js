import React from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [clicked, setClicked] = React.useState(true);
  const [selected, setSelected] = React.useState("");
  const [trendingData, setTrendingData] = React.useState();
  const [filterData, setFilterData] = React.useState();

  const handleSelectTrending = () => {
    setClicked(false);
    setSelected("trending");
    Axios.get(
      "https://api.giphy.com/v1/gifs/trending?api_key=BBllUXSslRRw4234LL4rT5VfMbKLLG6A"
    ).then((res) => {
      setTrendingData(res.data.data);
      // console.log(res.data.data, trendingData);
    });
  };

  const handleSelectSearch = () => {
    setClicked(false);
    setSelected("search");
    // console.log(selected, clicked);
  };

  const handleFilterSearch = (e) => {
    const { value } = e.target;
    const filterData = [...trendingData].filter((obj) =>
      Object.keys(obj).some((key) =>
        String(obj[key]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterData(filterData);
    console.log(filterData);
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
        <p>Click any of the links above</p>
      ) : selected === "trending" ? (
        <div className="text-center my-1 w-100">
          <p className="my-3">Trending List of Giphy:</p>
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
          {filterData === null ? (
            <p className="text-center text-dark">No Result Found</p>
          ) : (
            filterData &&
            filterData.map((item) => {
              return (
                <div className="row my-3">
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
                </div>
              );
            })
          )}
        </div>
      )}
      {/* {selected === "trending" ? <div>Trending List of Giphy</div> : <div>Search List of Giphy:</div>} */}
    </div>
  );
}

export default App;
