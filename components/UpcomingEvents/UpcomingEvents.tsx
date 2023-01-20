import React, { useState, useEffect } from "react";
import EventCard from "../Card/EventCard";
import { eventInterface } from "../../types/interface";
import { baseUrl, headers } from "../../utils/fetchAPI";
import axios from "axios";

const UpcomingEvents = () => {
  const [eventList, setEventLists] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await axios.get(
        "https://bing-news-search1.p.rapidapi.com/news/search?q=education",
        headers
      );
      let newList = data.value.filter(
        (item: object, index: number) => index < 3
      );
      setEventLists(newList);
    };
    fetchAPI();
  }, []);

  return (
    <div className="container px-2 sm:px-4 py-4 my-8 flex flex-col gap-4 items-center text-center mx-auto">
      <h1 className="mt-8 text-2xl font-semibold">Upcoming Events</h1>
      <p className="hidden md:block">
        Learn more about the current state of education around the world.
      </p>
      <div className="px-4 mt-8 md:w-[95%] md:mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {eventList &&
          eventList.map((item: eventInterface, index: number) => {
            if (index < 3) {
              return <EventCard key={index} item={item} />;
            }
          })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
