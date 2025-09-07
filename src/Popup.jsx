import React, { useState, useEffect } from "react";
import "./popup.css";
import Footer from "./Footer";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Popup = () => {
  const [totals, setTotals] = useState([]);
  const [closedTotals, setClosedTotals] = useState([]);
  const [visitCounts, setVisitCounts] = useState({});
  const [count, setCount] = useState(0);
  const [countActive, setCountActive] = useState(0);
  const [activeTabs, setActiveTabs] = useState([]);

  const handleRedirect = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html#/home") });
  };

  useEffect(() => {
    const fetchData = () => {
      chrome.storage.local.get(
        ["siteData", "closedTabs", "visitCount", "focusedTabData"],
        (data) => {
          const siteData = data.siteData || {};
          const closedTabs = data.closedTabs || {};
          const visitCount = data.visitCount || {};
          const focusedTabData = data.focusedTabData || {};

          setCount(Object.keys(siteData).length + Object.keys(closedTabs).length);
          setCountActive(Object.keys(siteData).length);

          const allData = Object.entries(siteData)
            .map(([_, { time, name }]) => ({ hostname: name, time }))
            .sort((a, b) => b.time - a.time);
          setTotals(allData);

          const closedData = Object.entries(closedTabs)
            .map(([_, { time, name }]) => ({ hostname: name, time }))
            .sort((a, b) => b.time - a.time);
          setClosedTotals(closedData);

          const activeTabs = Object.entries(focusedTabData)
            .map(([_, { time, name }]) => ({ hostname: name, time }))
            .sort((a, b) => b.time - a.time)
            .slice(0, 3);
          setActiveTabs(activeTabs);

          setVisitCounts(visitCount);
        }
      );
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 1000 / 60 / 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${hours > 0 ? hours + " hr " : ""}${minutes} min ${seconds} sec`;
  };

  const chartData = {
    labels: totals.map((item) => item.hostname),
    datasets: [
      {
        label: "Time (sec)",
        data: totals.map((item) => Math.floor(item.time / 1000)),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
          "#e7e9ed",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Time Spent on Websites",
      },
    },
  };

  return (
    <div className="popup-container">
      <header className="popup-header">
        <h1>🧭 Browser Activity Tracker</h1>
      </header>

      <section className="section">
        <h2>🟢 Background Active Websites</h2>
        {totals.map(({ hostname, time }, index) =>
          hostname === "newtab" ? null : (
            <div key={index} className="site-item">
              <span>{hostname}</span>
              <span>{formatTime(time)}</span>
            </div>
          )
        )}
      </section>

      <section className="section">
        <h2>📊 Visit Count</h2>
        {Object.entries(visitCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([hostname, count], index) => (
            <div key={index} className="site-item">
              <span>{hostname}</span>
              <span>{count} {count === 1 ? "time" : "times"}</span>
            </div>
          ))}
      </section>

      {closedTotals.length > 0 && (
        <section className="section">
          <h2>🔴 Closed Websites</h2>
          {closedTotals.map(({ hostname, time }, index) =>
            hostname === "newtab" ? null : (
              <div key={index} className="site-item">
                <span>{hostname}</span>
                <span>{formatTime(time)}</span>
              </div>
            )
          )}
        </section>
      )}

      <section className="section">
        <h2>📈 Summary Chart</h2>
        {totals.length > 0 ? (
          <Doughnut data={chartData} options={chartOptions} />
        ) : (
          <p>No data to show in chart.</p>
        )}
      </section>

      <section className="section stats">
        <h2>📉 Stats</h2>
        <div className="stat-row">
          <span>Websites Visited:</span>
          <span>{count}</span>
        </div>
        <div className="stat-row">
          <span>Active Websites:</span>
          <span>{countActive}</span>
        </div>
      </section>

      <div className="redirect-button">
        <button onClick={handleRedirect}>Go to Homepage</button>
      </div>

      <Footer />
    </div>
  );
};

export default Popup;
