import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */

export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("");
  const [handler, setHandler] = useState("");
  const [team, setTeam] = useState("");

  const [addPuppy, { isLoading, isError }] = useAddPuppyMutation();
  const [errorMessage, setErrorMessage] = useState("");

  async function postPuppy(event) {
    event.preventDefault();

    if (!name || !breed) {
      setErrorMessage("Name and Breed are required.");
      return;
    }

    const imageUrl =
      "https://images.squarespace-cdn.com/content/v1/5e77a95845630059ae9de949/1664562080769-9YZ4KYGWDUY68W0ZKUNZ/pawprint.png?format=1500w";

    const newPuppy = { name, breed, status, handler, imageUrl };

    try {
      await addPuppy(newPuppy).unwrap();
      setName("");
      setBreed("");
      setStatus("");
      setHandler("");
      setTeam("");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to add puppy:", error);
      setErrorMessage("Failed to add puppy. Please try again.");
    }
  }

  return (
    <>
      <div className="AddPup">
        <h2>Add a Puppy</h2>
        <form onSubmit={postPuppy}>
          <label>
            Name
            <input
              name="puppyName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Breed
            <input
              name="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </label>
          <label>
            Status
            <input
              name="puppyStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
          <label>
            Handler
            <input
              name="puppyHandler"
              value={handler}
              onChange={(e) => setHandler(e.target.value)}
            />
          </label>
          <label>
            Team
            <input
              name="Team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
          </label>
          <button disabled={isLoading}>
            {isLoading ? "Adding..." : "Add to Roster"}
          </button>
        </form>

        {errorMessage && <p>{errorMessage}</p>}
        {isError && !errorMessage && <p>Error: Try Again</p>}
      </div>
    </>
  );
}
