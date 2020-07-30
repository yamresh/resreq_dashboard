import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import requireAuth from "./requireAuth";
import { config } from "../utils";
const UserDetails = () => {
  const [item, setUserData] = useState([]);
  let { userId } = useParams();
  console.log("user ID", userId);
  useEffect(() => {
    fetchData();
  }, [userId]);
  const fetchData = async () => {
    const res = await fetch(`${config.API_URL}/users/${userId}`);
    const data = res.json();
    data.then((jsonData) => {
      console.log(jsonData.data);
      setUserData(jsonData.data);
    });
  };

  return (
    <div>
      <div className="user-info">
        <ul>
          {item && (
            <li className="user-list" key={item.id}>
              <img
                src={item.avatar}
                alt={`${item.first_name} ${item.last_name}`}
              />
              <h4 className="heading">
                {item.first_name} {item.last_name}
              </h4>
              <p className="profession">
                <strong>Co-founder & CEO</strong> at
                <strong> Bravo Incorporation</strong>
              </p>
              <div className="contact-info">
                <span className="tel">Tel: 9810098100</span>
                <span className="email"> {item.email}</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default requireAuth(UserDetails);
