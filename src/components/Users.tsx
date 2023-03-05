import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type Props = {};

function Users({}: Props) {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // Create an AbortController instance to cancel the request if the component is unmounted

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data); // Only update the state if the component is mounted
      } catch (e) {
        console.log(e);
        navigate('/login', {state: {from: location}, replace: true});
      }
    };

    getUsers();

    return () => {
      // This is the cleanup function
      isMounted = false; // Set the flag to false when the component is unmounted
      controller.abort(); // Abort the request if the component is unmounted
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length > 0 ? (
        <ul>
          {users.map((user: any, index) => (
            <li key={index}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </article>
  );
}

export default Users;
