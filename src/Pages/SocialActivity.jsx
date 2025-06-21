import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AOS from "aos";
import "aos/dist/aos.css";

import CardPost from "../components/CardPost";
import CardEvent from "../components/CardEvent";
import CardContribution from "../components/CardContribution";

import { supabase } from "../supabase";   

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium
               transition-all duration-300 ease-in-out flex items-center gap-2
               bg-white/5 hover:bg-white/10 rounded-md border border-white/10
               hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
      </svg>
    </span>
    <span
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all
                 duration-300 group-hover:w-full"
    />
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `social-tab-${index}`,
    "aria-controls": `social-tabpanel-${index}`,
  };
}

export default function SocialActivity() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [contribs, setContribs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch posts
        let { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (postsError) throw postsError;
        setPosts(postsData || []);

        // Fetch events
        let { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: false });
        if (eventsError) throw eventsError;
        setEvents(eventsData || []);

        // Fetch contributions
        let { data: contribsData, error: contribsError } = await supabase
          .from("contributions")
          .select("*")
          .order("created_at", { ascending: false });
        if (contribsError) throw contribsError;
        setContribs(contribsData || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleChange = (_, newValue) => setValue(newValue);
  const toggleAll = () => setShowAll((prev) => !prev);

  const displayArray = (index) => {
    const arr = index === 0 ? posts : index === 1 ? events : contribs;
    return showAll ? arr : arr.slice(0, initialItems);
  };

  if (loading) {
    return (
      <div className="text-center text-white py-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div
      id="SocialActivity"
      className="md:px-[10%] px-[5%] w-full py-[3rem] bg-[#030014] overflow-hidden"
    >
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text
                       bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          Social Activity
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Follow my recent posts, events and open-source contributions.
        </p>
      </div>
      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg,rgba(139,92,246,0.03),rgba(59,130,246,0.03))",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "rgba(139,92,246,0.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg,rgba(139,92,246,0.2),rgba(59,130,246,0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139,92,246,0.2)",
                },
              },
            }}
          >
            <Tab label="Posts" {...a11yProps(0)} />
            <Tab label="Events" {...a11yProps(1)} />
            <Tab label="Contributions" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          {[0, 1, 2].map((idx) => (
            <TabPanel key={idx} value={value} index={idx} dir={theme.direction}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayArray(idx).map((item) => {
                  if (idx === 0) return <CardPost key={item.id} data={item} />;
                  if (idx === 1) return <CardEvent key={item.id} data={item} />;
                  return <CardContribution key={item.id} data={item} />;
                })}
              </div>
              {[posts, events, contribs][idx].length > initialItems && (
                <div className="mt-6 flex justify-start">
                  <ToggleButton onClick={toggleAll} isShowingMore={showAll} />
                </div>
              )}
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>
    </div>
  );
}
