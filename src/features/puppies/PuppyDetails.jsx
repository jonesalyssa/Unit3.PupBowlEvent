import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPuppyDetailsQuery,
  useRemovePuppyMutation,
} from "../../features/puppies/puppySlice";

export default function PuppyDetails() {
  const { id } = useParams();
  console.log("Puppy ID from route:", id);

  const { data, isLoading, isError, error } = useGetPuppyDetailsQuery(id);
  console.log("API response data:", data);
  console.log("API response error:", error);

  const [removePuppy] = useRemovePuppyMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await removePuppy(id).unwrap();
      navigate("/puppy-list");
    } catch (err) {
      console.error("Failed to delete the puppy:", err);
    }
  };

  if (isLoading) return <p>Loading puppy information...</p>;
  if (isError)
    return (
      <p>
        Error loading puppy information:{" "}
        {error?.data?.message || error?.message}
      </p>
    );
  if (!data) return <p>No details available for this puppy.</p>;

  return (
    <article>
      <h1>Puppy Bowl</h1>

      {/* Make sure the data is there */}
      {data?.data?.player ? (
        <>
          <h2>{data.data.player.name}</h2>
          <img
            src={data.data.player.imageUrl}
            alt={data.data.player.name}
            style={{ maxWidth: "300px", height: "auto" }}
          />
          <p>
            <strong>Breed:</strong> {data.data.player.breed}
          </p>
          <p>
            <strong>Status:</strong> {data.data.player.status}
          </p>
          <p>
            <strong>ID:</strong> {id}
          </p>
          <button onClick={handleDelete}>Delete Puppy</button>
        </>
      ) : (
        <p>No details available for this puppy.</p>
      )}
    </article>
  );
}
