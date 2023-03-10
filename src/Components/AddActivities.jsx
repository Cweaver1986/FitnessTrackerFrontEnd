import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  attachActivityToRoutine,
  getAllActivities,
  getAllRoutines,
} from "../api/auth";

const AddActivities = ({ routine, setRoutine }) => {
  const routineId = routine.id;
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate;

  useEffect(() => {
    const getActivities = async () => {
      const response = await getAllActivities();
      setActivities(response);
    };
    getActivities();
  }, []);

  let activitiesToMap = activities.map((a, index) => {
    return (
      <option value={a.id} key={index}>
        {a.name}
      </option>
    );
  });

  return (
    <div>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            console.log(activityId);
            const addActivities = await attachActivityToRoutine({
              routineId,
              activityId,
              count,
              duration,
            });
            const routines = await getAllRoutines();
            const routineToFilter = routines?.filter((routine) => {
              return addActivities.routineId === routine.id;
            });
            setRoutine(routineToFilter[0]);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <label>Choose an Activity: </label>
        <select
          onChange={(event) => setActivityId(parseInt(event.target.value))}
        >
          {activitiesToMap}
        </select>
        <label htmlFor="count">Count</label>
        <input
          value={count}
          type="number"
          placeholder="count"
          min="0"
          onChange={(event) => setCount(parseInt(event.target.value))}
        ></input>
        <label htmlFor="duration">Duration</label>
        <input
          value={duration}
          type="number"
          placeholder="duration"
          min="0"
          onChange={(event) => setDuration(parseInt(event.target.value))}
        ></input>
        <button type="submit">Add Activity to {routine.name}</button>
      </form>
    </div>
  );
};

export default AddActivities;
