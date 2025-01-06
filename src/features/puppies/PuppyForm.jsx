import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [addPuppy, { isLoading, isError }] = useAddPuppyMutation();
  const [errorMessage, setErrorMessage] = useState("");

  // DONE: Use the `addPuppy` mutation to add a puppy when the form is submitted

  async function postPuppy(event) {
    // I added "async" to solve an error in my code
    event.preventDefault();

    if (!name || !breed) {
      setErrorMessage("");
      return;
    }

    const imageUrl =
      "https://images.squarespace-cdn.com/content/v1/5e77a95845630059ae9de949/1664562080769-9YZ4KYGWDUY68W0ZKUNZ/pawprint.png?format=1500w";

    const newPuppy = { name, breed, imageUrl };

    try {
      // added this to solve an error in my code
      await addPuppy(newPuppy).unwrap();
      setName("");
      setBreed("");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to add puppy:", error);
      setErrorMessage("Failed to add puppy. Please try again.");
    }
  }

  return (
    <>
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
        <button disabled={isLoading}>
          {isLoading ? "Adding..." : "Add to Roster"}
        </button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
      {isError && !errorMessage && <p>Error: Try Again</p>}
    </>
  );
}
