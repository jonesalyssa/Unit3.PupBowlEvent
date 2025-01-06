import {
  useGetPuppyQuery,
  useDeletePuppyMutation,
} from "../../features/puppies/puppySlice";
import PropTypes from "prop-types";

/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // DONE: Grab data from the `getPuppy` query

  const {
    data: puppy,
    isLoading,
    error,
  } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId,
  });

  // DONE: Use the `deletePuppy` mutation to remove a puppy when the button is clicked

  const [deletePuppy, { isLoading: isDeleting }] = useDeletePuppyMutation();

  // Function to handle the removal of a puppy
  function removePuppy(id) {
    deletePuppy(id);
    setSelectedPuppyId(null);
  }
  // There are 3 possibilities:
  // 1. A puppy has not yet been selected.
  //  2. A puppy has been selected, but results have not yet returned from the API.
  // 3. Information about the selected puppy has returned from the API.

  let $details;

  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  } else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  } else if (error) {
    $details = <p>Error loading puppy information: {error.message}</p>;
  } else if (puppy) {
    $details = (
      <>
        <h3>
          {puppy.name} #{puppy.id}
        </h3>
        <p>{puppy.breed}</p>
        <p>Team: {puppy.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePuppy(puppy.id)} disabled={isDeleting}>
          {isDeleting ? "Removing..." : "Remove from roster"}
        </button>
        <figure>
          <img src={puppy.imageUrl} alt={puppy.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}

PuppyDetails.propTypes = {
  // I added the props stuff because I was getting console errors
  selectedPuppyId: PropTypes.number,
  setSelectedPuppyId: PropTypes.func.isRequired,
};
