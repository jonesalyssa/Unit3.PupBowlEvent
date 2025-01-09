import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useGetPuppiesQuery } from "../../features/puppies/puppySlice";
import { setSelectedPuppyId } from "../../features/puppies/puppySlice";
import { useState, useEffect } from "react";

export default function PuppyList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetPuppiesQuery();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  if (isLoading) return <p>Loading puppies...</p>;
  if (error) return <p>Error loading puppies: {error.message}</p>;

  const puppies = Array.isArray(data) ? data : [];

  const filteredPuppies = searchTerm
    ? puppies.filter((puppy) =>
        puppy.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : puppies;

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {filteredPuppies.length === 0 ? (
          <li>No puppies to show.</li>
        ) : (
          filteredPuppies.map((p) => (
            <li key={p.id}>
              <h3>{p.name}</h3>
              <figure>
                <img src={p.imageUrl} alt={p.name} />
              </figure>
              <p>Breed: {p.breed}</p>
              <p>Status: {p.status}</p>
              <Link to={`/puppies/${p.id}`}>
                <button onClick={() => dispatch(setSelectedPuppyId(p.id))}>
                  View Details
                </button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </article>
  );
}
