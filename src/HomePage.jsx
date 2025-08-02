import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./Footer";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

function HomePage() {
  const [data, setData] = useState({
    activeTabs: {},
    closedTabs: {},
    visitCount: {},
    siteData: {},
    focusedTabData: {},
  });

  const categories = {
    "Social Media": ["facebook.com", "twitter.com", "instagram.com"],
    "Shopping": ["amazon.com", "ebay.com", "etsy.com"],
    "News": ["bbc.com", "cnn.com", "nytimes.com"],
    "Productivity": ["notion.so", "trello.com", "slack.com"],
    "Entertainment": ["youtube.com", "netflix.com", "spotify.com"],
    "Other": [],
  };

  useEffect(() => {
    const fetchData = () => {
      chrome.storage.local.get(
        ["activeTabs", "closedTabs", "visitCount", "siteData", "focusedTabData"],
        (result) => {
          setData({
            activeTabs: result.activeTabs || {},
            closedTabs: result.closedTabs || {},
            visitCount: result.visitCount || {},
            siteData: result.siteData || {},
            focusedTabData: result.focusedTabData || {},
          });
        }
      );
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    return `${minutes} min`;
  };

  const categorizeWebsites = () => {
    const categorized = Object.entries(data.siteData).reduce((acc, [site, { time }]) => {
      let foundCategory = "Other";
      for (const [category, websites] of Object.entries(categories)) {
        if (websites.some((website) => site.includes(website))) {
          foundCategory = category;
          break;
        }
      }
      if (!acc[foundCategory]) acc[foundCategory] = [];
      acc[foundCategory].push({ site, time });
      return acc;
    }, {});

    for (const category in categorized) {
      categorized[category] = categorized[category].sort((a, b) => b.time - a.time);
    }

    return categorized;
  };

  const categorizedWebsites = categorizeWebsites();

  const chartData = Object.entries(categorizedWebsites).map(([category, sites]) => {
    const totalTime = sites.reduce((acc, curr) => acc + curr.time, 0);
    return { category, minutes: Math.floor(totalTime / 60000) };
  });

  const sortedVisitCount = Object.entries(data.visitCount).sort((a, b) => b[1] - a[1]);

  return (
    <div className="container p-4" style={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <h1 className="text-center mb-4 fw-bold text-primary">📊 Website Usage Summary</h1>

      {/* Summary Chart */}
      <section className="mb-5">
        <h3 className="mb-3">📈 Time Spent by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} min`} />
            <Legend />
            <Bar dataKey="minutes" fill="#007bff" name="Time (min)" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Most Visited Websites */}
      <section>
        <h3 className="mb-3">🔥 Most Visited Websites</h3>
        <ul className="list-group mb-4">
          {sortedVisitCount.map(([site, count]) => (
            <li key={site} className="list-group-item d-flex justify-content-between align-items-center shadow-sm rounded">
              <span className="fw-semibold">{site}</span>
              <div>
                <span className="badge bg-warning text-dark me-2">{count}x</span>
                <span className="badge bg-info text-dark">
                  {formatTime(data.siteData[site]?.time || 0)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <hr />

      {/* Categorized Websites */}
      <section>
        <h3 className="mb-3">📂 Categorized Websites</h3>
        {Object.entries(categorizedWebsites).map(([category, websites]) => (
          <div key={category} className="mb-4">
            <h5 className="text-secondary fw-bold">{category}</h5>
            <ul className="list-group">
              {websites.map(({ site, time }) => (
                <li key={site} className="list-group-item d-flex justify-content-between align-items-center shadow-sm">
                  {site}
                  <span className="badge bg-secondary">{formatTime(time)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <hr />

      {/* Tips */}
      <section>
        <h3 className="mb-3">💡 Productivity Tips</h3>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">⏱️ Set limits on time-wasting sites.</li>
          <li className="list-group-item">📈 Track habits and review weekly.</li>
          <li className="list-group-item">🚫 Block sites during focus time.</li>
          <li className="list-group-item">✅ Use tools like Notion or Trello to plan.</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
