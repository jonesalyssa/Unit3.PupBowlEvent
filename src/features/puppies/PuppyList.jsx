import { useGetPuppiesQuery } from "../../features/puppies/puppySlice";

/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */

// DONE: Get data from getPuppies query

export default function PuppyList() {
  const { data, isLoading, error } = useGetPuppiesQuery();

  const puppies = Array.isArray(data) ? data : [];
  if (isLoading) return <p>Loading players...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {puppies.length === 0 ? (
          <li>No players to show.</li>
        ) : (
          puppies.map((p) => (
            <li key={p.id}>
              <h3>
                {p.name} #{p.id}
              </h3>
              <figure>
                <img src={p.imageUrl} alt={p.name} />
              </figure>
              <p>Breed: {p.breed}</p>
              <p>Status: {p.status}</p>
            </li>
          ))
        )}
      </ul>
    </article>
  );
}

PuppyList.propTypes = {};
